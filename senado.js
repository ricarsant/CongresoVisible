
document.body.style.zoom = 0.80
 svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    margin = {top: 30, right: 20, bottom: 80, left: 70};


function senado (senado){

var margin1 = 20,
        width1 = 800 - margin1 * 2,
        height1 = 20;


var x1 = d3.scaleTime()
			.range([0,width1]);
			
var datos;

d3.csv(senado,function(error, datos){
		if(error) throw error


titulos ={};

var parseDate = d3.timeParse("%Y-%m-%d");

datos = datos.sort((a,b) => d3.ascending(a.fecha_radicacion,b.fecha_radicacion));

datos.forEach(function(d){
	
var propertyName =  d.id_proyecto;
var propertyValue = d.titulo;
titulos[propertyName] =propertyValue;
d.fecha_radicacion = parseDate(d.fecha_radicacion);
});
 
 x1
  .domain(d3.extent(datos,function(d){return d.fecha_radicacion}))
			
			

/*  selector rango año*/

 	
var x = d3.scaleLinear()
        .domain([0,100])
        .range([0, width1]);
	
		
 var brush = d3.brushX()
        .extent([[0,0], [width1,20]])
        .on("brush", brushed);


/*Fin selector*/

 //selector
   
   
   var svg1 = d3.select("#selecion").append("svg")
        .attr("width", width1 + margin1 * 2)
        .attr("height", height1 + margin1)
      .append("g")
       .attr("transform", "translate(" + margin1 + "," + margin1 + ")")
        .call(d3.axisBottom()
            .scale(x1)
            .ticks(8));

   var brushg = svg1.append("g")
        .attr("class", "brush")
        .call(brush)
   
   //selector
 brush.move(brushg, x1.range());
 
 
 function brushed() {
      console.log ("gggd",datos);
      var range = d3.brushSelection(this)
          .map(x1.invert);
		  yeard = range[0].getFullYear();
		  mesd = range[0].getMonth() +1;
		  diad = range[0].getDate();
		  
		  yearh = range[1].getFullYear();
		  mesh = range[1].getMonth()+1;
		  diah = range[1].getDate();
      var rangoFecha = "Rango Fecha: " + yeard + "/" + mesd + "/" + diad + " a " + yearh + "/" + mesh + "/" + diah
      d3.selectAll("span")
          .text(rangoFecha);
		  
		  d3.select("#svg").selectAll(".arbol").remove();
 var startDate = "2015-08-04";
 datosnew = datos.filter(
      function(d){
return  (d.fecha_radicacion) >= range[0] && (d.fecha_radicacion) <= range[1]; //new Date(startDate);  
	 
 });
 
 
 
 console.log("new daTA ", datosnew);
		  showTree(datosnew)
    }
   

} 
); 


function showTree(datos){


data = d3.nest()
			.key(function(d){return d.comision_entrante;})
			.key(function(d){return d.iniciativa;})
			.key(function(d){return d.estado_actual;})
			.key(function(d){return d.id_proyecto;})
			.entries(datos);
			
			console.log(data);
treeObj = new Object();

treeObj.name = "Crongreso";

children =[];


		
data.forEach(function(d){
	objItem = {};
	objItem.name = d.key;
	if(d.key.indexOf("/")>=1 ){
		nomb = d.key.split("/");
		subchildren =[];
		for(var i =0;i<nomb.length;i++)
		{
		objn = {};
		objn.name =nomb[i];
		objn.children =[];
		subchildren.push(objn);
		}
		
	}else{
	}
	
	 children1 =[];
	 
	  d.values.forEach(function(d1){
		  objItem1 ={};
		  objItem1.name = d1.key;
		  
		  children2 =[];
		  d1.values.forEach(function(d2){
			  objItem2 ={};
			  objItem2.name = d2.key;
			  children2.push(objItem2);
			  children3 =[]
			  d2.values.forEach(function(d3){
				  objItem3 ={};
				  objItem3.name = d3.key;
				  children3.push(objItem3);
				  
			  })
			  objItem2.children = children3;
			  
		  })
		  
		  
		  objItem1.children =children2;
		  
		  
		  children1.push(objItem1);

		  
		  
	  })
	  
	 objItem.children = children1; 
	children.push(objItem);
	if (typeof(subchildren)!== 'undefined'){
	Array.prototype.push.apply(children,subchildren);
	subchildren = [];
	}
})
treeObj.children = children;


data = treeObj;
console.log("DATA /TREE", data);



 const root = d3.hierarchy(data);

  dy = width / 6;
  dx = 20;
  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  console.log("DATA HIERRACHI ROOT",root);
  
  svg
	  .attr("width", width)
      .attr("height", dx)
      .attr("viewBox", [-margin.left, -margin.top, width, dx])
      .style("font", "10px sans-serif")
      .style("user-select", "none");
   
   const gLink = svg.append("g")
	.attr("class","arbol")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

  const gNode = svg.append("g")
  .attr("class","arbol")
      .attr("cursor", "pointer");

     tree = d3.tree().nodeSize([dx, dy]);
	 diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
   
   function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();
	
	console.log("NODES",nodes);
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;

    const transition = svg.transition()
        .duration(duration)
        .attr("height", height)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    // Update the nodes…
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", d => {
          d.children = d.children ? null : d._children;
          update(d);
        });

    nodeEnter.append("circle")
     	.attr("r", function(d){
			return d._children ? '9' : '5';
		})
		.style('fill', function(d) {
			        	return d._children ? 'lightsteelblue' : '#add8e6';
			        })
		
	    nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -15 : 15)
        .attr("text-anchor", d => d._children ? "end" : "start")
			
	  .text(d => {
		   if(d.data.name.indexOf("/") >= 1){
			  
			   return "Mixta";
			   
		   }
		   else{return d.data.name }
		   
	  
		   
	   }
	      
	
	   )
	   
	   .on("mouseover",function(d){
		 d3.select(this)    
		  .append("title")
		  .html(function(d){
			 if (typeof(d.data.children)== 'undefined'){
				var id_titulo =d.data.name
			  return "Contratos :" + titulos[id_titulo];
			 }
			 
		  });
	 })
	   
	   
	    nodeEnter.append('text')
			        .attr('x', function(d){
						if( d.children && d.children.length>=10) return -8;
						else if(d.children) return -3;
						
						if( d._children && d._children.length>=10) return -8;
						else if(d._children) return -3;
					})
			        .attr('y', 3)
			        .attr('cursor', 'pointer')
			        .style('font-size', '10px')
			        .text(function(d) {
			        	if (d.children) return d.children.length;
			        	else if (d._children) return d._children.length;
			        })

	   
	   
      .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

		
		
		
    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);
		
	

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);
		
		
			

    // Update the links…
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        });

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

   update(root);

}
    
} ; 
senado ("senado.csv");