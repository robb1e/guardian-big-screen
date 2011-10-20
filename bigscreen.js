
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
        return 'http://content.guardianapis.com/search?format=json&show-fields=standfirst&section=' + gu.bs.currentSection;
    },
    
    retrieve: function(){
        console.log('getting some more');
        $.ajax({
            url: gu.bs.uri(),
            dataType: 'jsonp',
            success: gu.bs.redraw
        });
    },
    
    redraw: function(data){
        $('.main').fadeToggle('slow', function(){    
            $.each(data.response.results, function(index, value){
                $('.brand').html('The Guardian big screen experience - ' + value.sectionName);
                if (index < 4) {
                    $('h1[data-gu-bigscreen=' + index + ']').html(value.webTitle);
                    $('h2[data-gu-bigscreen=' + index + ']').html(value.webTitle);
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
