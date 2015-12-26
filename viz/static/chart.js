var source = new EventSource('/stream');
var hash = {};
var width = 1200;
var height = 700;

source.onmessage = function (event) {
  word = event.data.split("|")[0];
  count = event.data.split("|")[1];
  if(!skip(word)){
    hash[word]=count;
  }
};

var t = -1;
    var n = 40;
    var v = 0;
    var data = svgContainer.selectAll("text")
    .data(d3.entries(hash), function(d){ return d.key; });
  
    function next () {
        return {
            time: ++t,
            value: v = Math.floor(Math.random()*20)
        };
    } 
   
    var margin = {top: 10, right: 10, bottom: 20, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
   
    var x = d3.scale.linear()
        .domain([0, n - 1])
        .range([0, width]);
   
    var y = d3.scale.linear()
        .domain([0, 20])
        .range([height, 0]);
   
    var line = d3.svg.line()
        .x(function(d, i) { console.log(d.time); return x(d.time); })
        .y(function(d, i) { return y(d.value); });
     
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
  
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var graph = g.append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom); 
   
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var axis = graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
   
    g.append("g")
        .attr("class", "y axis")
        .call(d3.svg.axis().scale(y).orient("left"));
   
  var path = graph.append("g")
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line);
    
    tick();
     
    function tick() 
  { 
        // push a new data point onto the back
        data.push(next());

        // update domain
        x.domain([t - n, t]);
  
        // redraw path, shift path left
        path
            .attr("d", line)
            .attr("transform", null)
            .transition()
            .duration(500)
            .ease("linear")
            .attr("transform", "translate(" + t - 1 + ")")
            .each("end", tick);
  
        // shift axis left
        axis
            .transition()
            .duration(500)
            .ease("linear")
            .call(d3.svg.axis().scale(x).orient("bottom"));
   
        // pop the old data point off the front
        data.shift();  
    } 

var updateViz = function () {
    var text = svgContainer.selectAll("text")
    .data(d3.entries(hash), function(d){ return d.key; })

   


    text.enter()
    .append("text")
    .attr("font-family", "sans-serif")

    text.text(function(d,i){ return d.key; })
      .transition(1000)
      .delay(5*Math.random())
      .attr("x",function(d,i){ return (3.5*d.value)+i*15; })
      .attr("y",function(d,i){ return (5.5*d.value)+i*25; })
      //.attr("font-size", function(d,i){ return d.value+"px"; })
      //.attr("x",400)
      //.attr("y",500)
      .attr("font-size", 35)
      .attr("fill", function(d, i) { return colors(d.value + i*10); })
      //comment following lines and uncomment previous for colors function
      //.attr("fill",function(d,i){return "rgb("+
      //Math.round(255/(1+Math.exp(-.001*d.value)))+","+
      //Math.round(255-255/(1+Math.exp(-.01*d.value)))+","+
      //Math.round(130-255/(1+Math.exp(-.01*d.value)))+")";});

    console.log("Array-2" + JSON.stringify(d3.entries(hash)));
};

//update display every #1000 milliseconds
window.setInterval(updateViz, 1000);

//clean list, can be added to word skipping bolt
var skipList = ["https","follow","1","2","please","following","followers","fucking","RT","the","at","a"];

var skip = function(tWord){
  for(var i=0; i<skipList.length; i++){
    if(tWord === skipList[i]){
      return true;
    }
  }
  return false;
};
