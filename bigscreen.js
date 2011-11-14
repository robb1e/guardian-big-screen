var gu = gu || {};
gu.bs = {
    
    sections: ['news', 'sport', 'travel', 'technology', 'commentisfree', 'politics', 'tv-and-radio', 'culture', 'business', 'money', 'lifeandstyle', 'environment', 'data', 'news'],
    currentSection: 'news',
    
    init: function(){
        setInterval(function(){gu.bs.retrieve();}, 5000);
    },
    
    uri: function(){
        var next = false;
        var stop = false;
        $.each(gu.bs.sections, function(index, value){
            console.log('current section is ' + gu.bs.currentSection + ' and evaluating ' + value);
            if (next && !stop){
                gu.bs.currentSection = value;
                stop = true;
            }
            if(value == gu.bs.currentSection){
                next = true;
            }
        });
        return 'http://content.guardianapis.com/search?format=json&show-fields=standfirst&show-media=picture&section=' + gu.bs.currentSection;
    },
    
     retrieve: function(){
        console.log('getting some more');
        $.ajax({
            url: gu.bs.uri(),
            dataType: 'jsonp',
            success: gu.bs.redraw2
        });
    },
    
    redraw: function(data){
        $('.main').fadeToggle('slow', function(){    
            $.each(data.response.results, function(index, value){
                $('.brand').html('The Guardian big screen experience - ' + value.sectionName);
                if (index < 4) {
                    $('h1[data-gu-bigscreen=' + index + ']').html(value.webTitle);
                    $('h2[data-gu-bigscreen=' + index + ']').html(value.webTitle);
                  if (value.mediaAssets.length>0)  {
                     // $('span[data-gu-bigscreen=' + index + ']').html(value.mediaAssets[0].file);
                      $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[0].file);
                    }
                  else {$('img[data-gu-bigscreen=' + index + ']').attr("src", 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/8/8/1312810126887/gu_192x115.jpg');} 
                   $('p[data-gu-bigscreen=' + index + ']').html(value.fields.standfirst);
                }
            });
        });
        $('.main').fadeToggle('slow', 'linear');
    },
    
    
    redraw2: function(data){
        $('.main').fadeToggle('slow', function(){    
            $.each(data.response.results, function(index, value){
                $('.brand').html('The Guardian big screen experience - ' + value.sectionName);
                if (index < 4) {
                    $('h1[data-gu-bigscreen=' + index + ']').html(value.webTitle);
                    $('h2[data-gu-bigscreen=' + index + ']').html(value.webTitle);
                  var array_size= value.mediaAssets.length;                 
                     switch (array_size)
                     {
                        case 1: $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[0].file);
                          break;
                        case 2:
                          $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[1].file);
                          break;
                        case 3:
                          $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[2].file);
                           break;
                        case 4:
                          $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[3].file);
                          break;
                          case 5:
                          $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[4].file);
                          break;
                           case 6:
                          $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[5].file);
                          break;
                          case 7:
                          $('img[data-gu-bigscreen=' + index + ']').attr("src",value.mediaAssets[6].file);
                          break;

                        default: $('img[data-gu-bigscreen=' + index + ']').attr("src", 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/8/8/1312810126887/gu_192x115.jpg');}
                   $('p[data-gu-bigscreen=' + index + ']').html(value.fields.standfirst);
                }
            });
        });
        $('.main').fadeToggle('slow', 'linear');
    }

};

$(document).ready(function(){
    gu.bs.init();
    gu.bs.retrieve();
});
