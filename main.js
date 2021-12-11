async function get_info()
{ 
  
  
    var appconfig=
    {
        
    "artist":"https://rest.bandsintown.com/artists/",
    "appid":"cf5f7993875c1932c0fdd22fce1a3c27",
    "events":"https://rest.bandsintown.com/artists/"

    }
    var input = document.getElementById('artistname').value;

    if (input ==  "" || input == null)
    {
        alert("Name must be filled out");

    }
    else
    {   
        //getting artists info 
        var artist_info_api =appconfig.artist+input+"?app_id="+appconfig.appid;
        let artist_api_response = await fetch(artist_info_api);
        let data = await artist_api_response.json();
        //getting events info
        var event_info_api=appconfig.events+input+"/events?"+"app_id="+appconfig.appid+"&date=upcoming";
        let event_api_response = await fetch(event_info_api);
        let event_data = await event_api_response.json();
        

        if(data.error=="Not Found")
        {
          document.getElementById("Artist_Name").innerText="Artist Does Not Exists";
          document.getElementById("image").src="/404.png";
          
          // document.getElementById("table_info").innerText="";
        }
  
        else
        {        
          // fetching image 
          document.getElementById("image").src=data.image_url;
 
          //Allocating facebook url to the icon   
          document.getElementById("facebook").setAttribute('href', data.facebook_page_url);  
          
          // Allocating Artist Name
          document.getElementById("Artist_Name").innerText=data.name;
            
          var s= data.links.length;
          for( let q=0; q< s; q++) 
            {
              if (data.links[q].type == "instagram")
              {
                console.log("found");
                document.getElementById("instagram").setAttribute('href', data.links[q].url);  
                q=s; //breaking the loop
              }
              else{
                console.log("notfound");
                document.getElementById("instagram").setAttribute('href', "#");

              }
            }

          }

        


          
        
        
        
      //to empty the table
        var x = document.getElementById("myTable").rows.length;
	
        for (let i = 1; i < x; i++) 
        {
    
          document.getElementById("myTable").deleteRow(1);
        }


        // fetching date and time by triversing the array recieved in api response
        var row_number=1;
        for (var i=0; i<event_data.length ; i++)
        {

         var date_time = event_data[i].datetime; 
         var venue_name = event_data[i].venue.name; 
         var venue_city = event_data[i].venue.city; 
         var venue_country = event_data[i].venue.country; 

        //Allocating to specified cell
         var table = document.getElementById("myTable");
         var row = table.insertRow(row_number);
         
         var cell1 = row.insertCell(0);
         var cell2 = row.insertCell(1);
         var cell3 = row.insertCell(2);
         var cell4 = row.insertCell(3);
         cell1.innerHTML = date_time;
         cell2.innerHTML = venue_name;
         cell3.innerHTML = venue_city;
         cell4.innerHTML = venue_country;
         row_number=row_number+1;


        }

}
   

}