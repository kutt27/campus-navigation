
function nav(a,b){
    var op=["h","u","a","l"];
    var menu=["home","report","about"];
    

    for(let i=0;i<=op.length-1;i++){
        document.getElementById(op[i]).style.backgroundColor="white";
    }
    for(let i=0;i<=menu.length-1;i++){
        document.getElementById(menu[i]).style.display="none";
    } 
    a.style.backgroundColor="#d9e9ffff";
    document.getElementById(b).style.display="flex";


}

function srol(a,b){
    var home= document.getElementById(b);

    home.scrollLeft=a;
}


function ham(){
var ha=document.getElementById("nav").style;

    if(ha.width=="0px"){
        ha.display="block"
        setTimeout(()=>{
            ha.width="300px";
            ha.padding="75px 10px";
        },1);

    }
    else{
        ha.width="0px";
        ha.padding="0px";
        
    setTimeout(()=>{
        ha.display="none"
    },500);}
}




function locate(){
    var from=document.getElementById("from").value;
    var to=document.getElementById("to").value;
    var map=["ground","floor-1","floor-2"];

    fetch("http://127.0.0.1:8000/nav/"+from+"/"+to)
    .then((res)=>(res.json()))
    .then((json) =>  {
        if(json.message=='ok'){
           
            var path=json.path;
            console.log(path)
for(let j=0;j<=map.length-1;j++){
    document.getElementById(map[j]).style.display='none';
}
            document.getElementById(map[path[0][2]]).style.display='block';
            document.getElementById(map[path[0][2]]).innerHTML="<image height='100%' width='100%' href='/static/"+map[path[0][2]]+".svg'></image>  ";
            

            for(let i=1;i<=path.length-1;i++){
                var x1=100-((path[i-1][1]/445)*100);
                var y1=((path[i-1][0]/768)*100);
                var x2=100-((path[i][1]/445)*100);
                var y2=((path[i][0]/768)*100);

                document.getElementById(map[path[i][2]]).innerHTML+="<line x1='"+x1+"%' y1='"+y1+"%' x2='"+x2+"%' y2='"+y2+"%' stroke-dasharray='5,2' style='stroke: blue;stroke-width: 3px;'></line>";
                if(path[i-1][2]!=path[i][2]){
                    document.getElementById(map[path[i][2]]).innerHTML="<image height='100%' width='100%' href='/static/"+map[path[i][2]]+".svg'></image>  ";
                    document.getElementById(map[path[i-1][2]]).innerHTML+="<circle onclick='switchmap("+path[i][2]+","+path[i-1][2]+")' r='7' cx='"+(100-((path[i-1][1]/445)*100))+"%' cy='"+(path[i-1][0]/768)*100+"%' fill=red />"
                    document.getElementById(map[path[i][2]]).innerHTML+="<circle onclick='switchmap("+path[i-1][2]+","+path[i][2]+")' r='7' cx='"+(100-((path[i][1]/445)*100))+"%' cy='"+(path[i][0]/768)*100+"%' fill=red />"
                    document.getElementById(map[path[i-1][2]]).innerHTML+="<circle class='circ' onclick='switchmap("+path[i][2]+","+path[i-1][2]+")' r='7' cx='"+(100-((path[i-1][1]/445)*100))+"%' cy='"+(path[i-1][0]/768)*100+"%' fill=red />"
                    document.getElementById(map[path[i][2]]).innerHTML+="<circle class='circ' onclick='switchmap("+path[i-1][2]+","+path[i][2]+")' r='7' cx='"+(100-((path[i][1]/445)*100))+"%' cy='"+(path[i][0]/768)*100+"%' fill=red />"

                }   
            }
            document.getElementById(map[path[path.length-1][2]]).innerHTML+="<circle r='7' cx='"+(100-((path[path.length-1][1]/445)*100))+"%' cy='"+(path[path.length-1][0]/768)*100+"%' fill=green />"
            document.getElementById(map[path[0][2]]).innerHTML+="<circle r='7' cx='"+(100-((path[0][1]/445)*100))+"%' cy='"+(path[0][0]/768)*100+"%' fill=yellow />"

            srol(500,'report')
        }
        else{
            console.log("error")
        }
    })
}

function switchmap(a,b){
    var map=["ground","floor-1","floor-2"];

    if(a>b){
    document.getElementById(map[b]).style.animation='map_up 1s normal';
    console.log("up");
    }
    else{
        document.getElementById(map[b]).style.animation='map_down 1s normal';
        console.log("down")
    }
    
    setTimeout(()=>{

    for(let j=0;j<=map.length-1;j++){
        document.getElementById(map[j]).style.display='none';
    }
    document.getElementById(map[a]).style.display='block';
    document.getElementById("floor_num").innerHTML=map[a];
    if(a>b){
        document.getElementById(map[a]).style.animation='map_down 1s reverse'
        }
    else{
        document.getElementById(map[a]).style.animation='map_up 1s reverse';
        }
    document.getElementById(map[b]).style.animation=null;
    setTimeout(()=>{document.getElementById(map[a]).style.animation=null},1000)
},1000);

    
}

function navigate(from,to){
    
    var map=["ground","floor-1","floor-2"];

    fetch("http://127.0.0.1:8000/nav/"+from+"/"+to)
    .then((res)=>(res.json()))
    .then((json) =>  {
        if(json.message=='ok'){
           
            var path=json.path;
            console.log(path)
for(let j=0;j<=map.length-1;j++){
    document.getElementById(map[j]).style.display='none';
}
            document.getElementById(map[path[0][2]]).style.display='block';
            document.getElementById("floor_num").innerHTML=map[path[0][2]];
            document.getElementById(map[path[0][2]]).innerHTML="<image height='100%' width='100%' href='/static/"+map[path[0][2]]+".svg'></image>  ";
            

            for(let i=1;i<=path.length-1;i++){
                var x1=100-((path[i-1][1]/445)*100);
                var y1=((path[i-1][0]/768)*100);
                var x2=100-((path[i][1]/445)*100);
                var y2=((path[i][0]/768)*100);

                document.getElementById(map[path[i][2]]).innerHTML+="<line x1='"+x1+"%' y1='"+y1+"%' x2='"+x2+"%' y2='"+y2+"%' stroke-dasharray='5,2' style='stroke: blue;stroke-width: 3px;'></line>";
                if(path[i-1][2]!=path[i][2]){
                    document.getElementById(map[path[i][2]]).innerHTML="<image height='100%' width='100%' href='/static/"+map[path[i][2]]+".svg'></image>  ";
                    document.getElementById(map[path[i-1][2]]).innerHTML+="<circle onclick='switchmap("+path[i][2]+","+path[i-1][2]+")' r='7' cx='"+(100-((path[i-1][1]/445)*100))+"%' cy='"+(path[i-1][0]/768)*100+"%' fill=red />"
                    document.getElementById(map[path[i][2]]).innerHTML+="<circle onclick='switchmap("+path[i-1][2]+","+path[i][2]+")' r='7' cx='"+(100-((path[i][1]/445)*100))+"%' cy='"+(path[i][0]/768)*100+"%' fill=red />"
                    document.getElementById(map[path[i-1][2]]).innerHTML+="<circle class='circ' onclick='switchmap("+path[i][2]+","+path[i-1][2]+")' r='7' cx='"+(100-((path[i-1][1]/445)*100))+"%' cy='"+(path[i-1][0]/768)*100+"%' fill=red />"
                    document.getElementById(map[path[i][2]]).innerHTML+="<circle class='circ' onclick='switchmap("+path[i-1][2]+","+path[i][2]+")' r='7' cx='"+(100-((path[i][1]/445)*100))+"%' cy='"+(path[i][0]/768)*100+"%' fill=red />"

                }   
            }
            document.getElementById(map[path[path.length-1][2]]).innerHTML+="<circle r='7' cx='"+(100-((path[path.length-1][1]/445)*100))+"%' cy='"+(path[path.length-1][0]/768)*100+"%' fill=green />"
            document.getElementById(map[path[0][2]]).innerHTML+="<circle r='7' cx='"+(100-((path[0][1]/445)*100))+"%' cy='"+(path[0][0]/768)*100+"%' fill=yellow />"

            srol(500,'report')
        }
        else{
            console.log("error")
        }
    })
}

function autocomp(ids,idres){
    var destination=[
        "porch",
        "toilet floor 0",
        "store",
        "library",
        'stairs floor 0',
        "iedc room",
        "microcontroller lab",
        "sector1",
        "security room",
        "eee staff room",
        "class room floor 0",
        "power electronics lab",
        "digital lab",
        "circuit lab pcb and prototyping lab",
        "stairs floor 1",
        "iqac room",
        "s4 eee",
        "com lab 2",
        "office",
        "exam cell",
        "principal room",
        "sick room",
        "ceo room",
        "s4 civil",
        "civil dept staff room",
        "toilet floor 1",
        "s6 civil",
        "s8 civil",
        "stairs floor 2",
        "s2 cse 2",
        "s2 cse 1",
        "seminar hall",
        "com lab",
        "cse dept staff room",
        "s8 cse",
        "s6 eee",
        "s6 combined class",
        "toilet floor 2",
        "s6 cse 1",
        "s6 cse 2",
        "aleena rahman",
        "ameena m aliyar"
  ];
    let from=document.getElementById(ids).value;
    
    document.getElementById(idres).innerHTML=null;
  
    for(let i=0;i<=destination.length-1;i++){
  
        if(destination[i].slice(0,from.length)==from.toLowerCase()){
          document.getElementById(idres).innerHTML+=
          "<p onclick='document.getElementById(\""+ids+"\").value=\""+destination[i]+"\"; document.getElementById(\""+idres+"\").innerHTML=\"\";'>"+destination[i]+"</p>";
        }
        if(from==""){
          document.getElementById(idres).innerHTML=null;
        }
      
    }
    
  }
  
function teacherinfo(a){
    var info=[["Ameena M Aliyar","Assistant professor","Computer Science Department","ameena","34","ameenaaliyar@gmail.com","+91 81290 25553","cse dept staff room"],
                ["Aleena Rahman","Assistant Professor","Civil Department","aleena","27","aleenarahman@gmail.com","+91 89463 73154","civil dept staff room"]];

                console.log("hghg");

                document.getElementById("teach_img").src="/static/images/"+info[a][3]+".jpeg";
                document.getElementById("teach_name").innerHTML=info[a][0];
                document.getElementById("teach_pos").innerHTML=info[a][1];
                document.getElementById("name").innerHTML="Name<b>---------</b>: "+info[a][0];
                document.getElementById("Age").innerHTML="Age<b>-----------.</b>: "+info[a][4];
                document.getElementById("email").innerHTML="Email<b>---------.</b>: "+info[a][5];
                document.getElementById("phone").innerHTML="Phone<b>-------..</b>: "+info[a][6];
                document.getElementById("dept").innerHTML="Department<b>.</b>: "+info[a][2];

                navigate('porch',info[a][7]);
}