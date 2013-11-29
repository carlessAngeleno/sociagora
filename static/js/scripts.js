/***********************************************************************
 * scripts.js
 *
 * Computer Science 50
 * Problem Set 7
 *
 * Global JavaScript, if any.
 **********************************************************************/


$(document).ready(function() {
 

    // updates prompt if category chosen
    $("#category_menu a").click(function(e) {
    
        var txt = $(e.target).text();
        $("#prompt").text(txt); 
        
    });

 
     // when user clicks on can't see button
    $("#cant_see_button").click(function() {     
 
         $.ajax({
        
            url: "select_random_row.php",
            type: 'POST',
            data: {
            },
            dataType: "json",
            success: function(response) { 
                $("#frame").attr("src", "about:blank");
                setTimeout(
                    function(){
                        $("#frame").attr("src", response);                
                        $("#page_url p").text(response);
                        $("#prompt").text("What kind of website is this?");                        
                    },100
                )
          }              
      });       
      
      // since we're overriding form submission, make sure it doesn't submit
      return false; 
    });  
 
 
 
    // when user clicks on share button
    $("#submit_selection_button").click(function() {        
            
        
        // store input as variables
        var category = $("#prompt").text();
        var url = $("#page_url p").text();
            
        
        //var title = $("#title_share").val();
        //var artist = $("#artist_share").val();
        //var lat = new_place_lat;
        //var lng = new_place_lng;
        //var g_place = new_place_g_place;
        //var month = $("#month_share").val();        
        //var year = $("#year_share").val();
        //var story = $("#story_share").val();        
        //var tag1 = $("#tag1_share").val(); 
      
        // use stored variables to send ajax request to share.php
        // (which validates input, inserts it into the "memory" table in SQL database, 
        //  and pulls all memories with the same title and artist as user's input)
        $.ajax({
        
            url: 'submit_selection.php',
            type: 'POST',
            data: {
                url: url,                
                category: category
                // title: title,
                //artist: artist,
                //video_id: video_id,
                //lat: lat,
                //lng: lng,
                //g_place: g_place,
                //month: month,
                //year: year,
                //story: story,
                //tag1: tag1
            },
            dataType: "json",
            success: function(response) { 
                console.log(response);
                // each memory to be represented by a marker       
                //markers = response;                            

                // plant all markers related to user's input
                //initialize();
                
                // change the title of the website to match the title of the song
                //$("#title").text(title + " - " + artist);  
                
                // direct user to the search tab                
                //$('#myTab a[href="#search_tab"]').tab('show');
          }              
      }); 
      
      
        $.ajax({
        
            url: "select_random_row.php",
            type: 'POST',
            data: {
            },
            dataType: "json",
            success: function(response) { 
                console.log(response);                
                // var frame = document.createElement("iframe");
                $("#frame").attr("src", "about:blank");
                $("#frame").attr("src", response);                
                $("#page_url p").text(response);
                $("#prompt").text("What kind of website is this?");
                // each memory to be represented by a marker       
                //markers = response;                            

                // plant all markers related to user's input
                //initialize();
                
                // change the title of the website to match the title of the song
                //$("#title").text(title + " - " + artist);  
                
                // direct user to the search tab                
                //$('#myTab a[href="#search_tab"]').tab('show');
          }              
      });       
      
      // since we're overriding form submission, make sure it doesn't submit
      return false; 
    });         
});
