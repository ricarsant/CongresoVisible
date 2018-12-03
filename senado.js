
document.body.style.zoom = 0.80
 svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    margin = {top: 30, right: 20, bottom: 80, left: 70};
	
var arregloCampos=[];
//var datos;
function dAngular(dato){
	var arreglo_campos=[];
	console.log("de Angular a D3, en D3 dato:", dato, dato.length);

	
	for(i =0;i<dato.length;i++){
		campo = dato[i].text;
		arreglo_campos.push(campo);
		console.log("adentro", "--", campo);
	}
	arregloCampos =arreglo_campos;
	console.log("de Angular a D3, en D3  arreglo_campos", arreglo_campos);
	
	console.log("datosxxxxxx", datosnew);
	d3.select("#selecion").selectAll("svg").remove();
	senado ("senado.csv");
	//showTree(datosnew);
	//brushed();
	
}



 
   ////**** PATH



//////*FIN FUNCION SEARCH*////

 

function senado (senado){

var margin1 = 20,
        width1 = 800 - margin1 * 2,
        height1 = 20;


var x1 = d3.scaleTime()
			.range([0,width1]);
			
//var datos;
//var encabezados =[];

d3.csv(senado,function(error, dataok){
		if(error) throw error
datos = dataok;
encabezados =Object.keys(datos[0]);
		console.log("Envabezados en d3",encabezados);
		console.log("ENCABEZADOS1 de ANGULAR A D3 quemados, en D3",encabezados1);
		//console.log("Ordenados de angular a d3",filedsToD3);
recive(encabezados);		
		
var titulos ={};
//valores_nodos={"Comision Tercera de Senado":50};
valores_nodos ={};

var parseDate = d3.timeParse("%Y-%m-%d");

datos = datos.sort((a,b) => d3.ascending(a.fecha_radicacion,b.fecha_radicacion));

datos.forEach(function(d){
	
//var propertyName =  d.id_proyecto;
//var propertyValue = d.titulo;
//titulos[propertyName] =propertyValue;
d.fecha_radicacion = parseDate(d.fecha_radicacion);
});
 
 x1
  .domain(d3.extent(datos,function(d){return d.fecha_radicacion}))
			
var tempo = 	d3.extent(datos,function(d){return d.fecha_radicacion});
console.log("extent", tempo);
 	
var x = d3.scaleLinear()
        .domain([0,100])
        .range([0, width1]);
	
		
 var brush = d3.brushX()
        .extent([[0,0], [width1,50]])
        .on("brush", brushed);
  
   
   var svg1 = d3.select("#selecion").append("svg")
        .attr("width", width1 + margin1 * 2)
        .attr("height", height1 + margin1*2)
      .append("g")
       .attr("transform", "translate(" + margin1 + "," + margin1 + ")")
        .call(d3.axisBottom()
            .scale(x1)
            .ticks(8));

   var brushg = svg1.append("g")
        .attr("class", "brush")
		.style("stroke","blue")
        .call(brush)
   
		// brush.move(brushg, x1.range());
 
   brush.move(brushg,  [x1(parseDate("2015-01-01")),x1(parseDate("2016-01-01"))]);
 
 
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
		var rangoFecha = "Rango Fecha: " + yeard + "/" + mesd + "/" + diad + " a " + yearh + "/" + mesh + "/" + diah;
		
		
		
		d3.selectAll("#fechamarca")
		.text(rangoFecha);
		
		
		/*
      d3.selectAll("span")
          .text(rangoFecha)
		  //.style("color","#D4DFED");
		  */
		  
		  d3.select("#svg").selectAll(".arbol").remove();
 //var startDate = "2015-08-04";
 datosnew = datos.filter(
      function(d){
return  (d.fecha_radicacion) >= range[0] && (d.fecha_radicacion) <= range[1]; 
	 
 });
 
 console.log("new new",datosnew);
 
 		  showTree(datosnew);
    }
} //fin cvs(function(){
); //fin cvs(

}//new fin senado

var gLink;
var gNode;
var root;

function showTree(datos){

if(arregloCampos.length ==0){
	arregloCampos = encabezados;
	
}
	console.log("de Angular a D3, en D3  arreglo_campos en showtree", arregloCampos);
/*
data = d3.nest()
			//.key(function(d){return d[encabezados[0]];})
			.key(function(d){return d.comision_entrante;})
			.key(function(d){return d.iniciativa;})
			.key(function(d){return d.estado_actual;})
			.key(function(d){return d.id_proyecto;})
			.entries(datos);
			
data01 = d3.nest()
			.key(function(d){return d.comision_entrante;})
			.rollup(function(v) { return v.length; })
			.entries(datos);
*/
titulos ={};
datos.forEach(function(d){
var propertyName =  d.id_proyecto;
var propertyValue = d.titulo;
titulos[propertyName] =propertyValue;
});


data = d3.nest()
			.key(function(d){return d[arregloCampos[0]];})
			.key(function(d){return d[arregloCampos[1]];})
			.key(function(d){return d[arregloCampos[2]];})
			.key(function(d){return d[arregloCampos[3]];})
			.entries(datos);
			
data01 = d3.nest()
			.key(function(d){return d[arregloCampos[0]];})
			.rollup(function(v) { return v.length; })
			.entries(datos);
			

			

total =0;

data01.forEach(function(d){
	var nombre = d.key
	valores_nodos[nombre] = d.value;
	total = total+d.value;
});

//Rescala = d3.scale.sqrt().domain([1, total]).range([10, 39]);
console.log("totall ",total)
console.log("comisiones", valores_nodos);


console.log("data nest",data);
			
treeObj = new Object();

treeObj.name = "Crongreso";
children =[];
data = creaTree(data);

//console.log("datata tree",data);


///**********


 //const root = d3.hierarchy(data);
 
root = d3.hierarchy(data);

  dy = width / 6;
  dx = 20;
  root.x0 = dy / 2;
  root.y0 = 0;
  
  
  
  /*
  root.descendants().forEach((d, i) => {
	  
	 console.log("d Interno",d);
	
   
  });
  */
  
  root.descendants().forEach((d, i) => {
	  
	// console.log("d Interno",d);
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  console.log("DATA HIERRACHI ROOT",root);
  
  
  
  val_nodes={};
	//poner_valores_nodos(root);
  
  
  
  
 // root.count();
 // console.log("The leaf count is "+root.value);
//console.log("The leaves are: "+root.leaves().map( d => d.data.name ));
  
  svg
	  .attr("width", width)
      .attr("height", dx)
      .attr("viewBox", [-margin.left, -margin.top, width, dx])
      .style("font", "10px sans-serif")
      .style("user-select", "none");
  
   //console.log(svg);
   
  
   
   
   
   //const gLink = svg.append("g")
   gLink = svg.append("g")
	.attr("class","arbol")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

  //const gNode = svg.append("g")
  gNode = svg.append("g")
  .attr("class","arbol")
      .attr("cursor", "pointer");

    
    tree = d3.tree().nodeSize([dx, dy]);
	 diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
	 
	 //se pasa a update
	
	 ////**************************************AQUI VA UPDATE *****************
	 
	 
	 ///////////////////////////////////FIN  UPDATE************************
	 
	 
   
   
   update(root);
   

	
 
 

   //val_nodes
   function poner_valores_nodos(root){
	   console.log("Funcion valores",root);
	   
	   
	   ///
	   
	   root.descendants().forEach((d, i) => {
	  
	  
	 /* 
	  d.sum(function(d) {
		if(d._children.length != "undefined"){
		return d._children.length;} })
	  ;
	  */
	  total =0;
	  if(d._children != "undefined"){
		  
		  
	  }
	  console.log("d Interno d",d);
  
	// console.log("d Interno suma",d._children._children._children.length);
  
    
  }); //fin foreach

   
 // root.count();
 // console.log("The leaf count is "+root.value);
//console.log("The leaves are: "+root.leaves().map( d => d.data.name ));
  
	   
	   ///
	   
   } //fin poner_valores_nodos
   
   

}  //showtree
 
    
//} ; // aqui original fin funcyion senado


//////NUEVA POSICION OTRAS FUNCIONES

function buscaProyecto(){
	
	var buscax = document.getElementById('filterInput').value;
	//console.log("Valor buscax",buscax,titulos);
	

	if(isNaN(buscax)){
		//var encuentra = false;
		buscax = buscax.toLowerCase();
		console.log("Valor buscax1",buscax, titulos);
		
		for(const item in titulos){
			titulo = titulos[item].toLowerCase();
			
			if(titulo.includes(buscax)){
				buscax = item;
				//enceuntra = true;
				break;
			}
			//console.log("titulos" , titulos[item]);
		}
		
		
	/*
		for(i=0;i<titulos.length;i++){
			id = titulos[i].id_proyecto;
			titulo = titulos[i].titulo;
			console.log("Valor titulos ****",id, titulo);
			titulo = titulo.toLowerCase();
			if(titulo.includes(buscax)){
				buscax = id;
				break;
			}
		}
		*/
	}
	/*
	alert(buscax);
	 var ubica = searchTree(root,buscax,[]);
	 openPaths(ubica);
	
*/	
console.log("****************salida**************",buscax);

	if(!isNaN(buscax)){
		 var ubica = searchTree(root,buscax,[]);
		 //alert(buscax);
  console.log("*********************busqueda... ", ubica);
  
  if(typeof ubica !== "undefined" && ubica.length>0){
 openPaths(ubica);
  }else{
	  buscax ="";
  }
		
	}else{
		buscax ="";
	}
	
	
	document.getElementById('enceuntra').value = buscax;
	
	 
} 

 ////**** PATH

function openPaths(paths){
	colorpath =  randDarkColor(); 
	//color1 =  ColorLuminance(colorpath,-0.6);
	//console.log("color colorpath ", colorpath, color1);


	
		for(var i =0;i<paths.length;i++){
			if(paths[i].id !== "1"){//i.e. not root
				paths[i].class = colorpath; //'found';
				if(paths[i]._children){ //if children are hidden: open them, otherwise: don't do anything
					paths[i].children = paths[i]._children;
	    			//paths[i]._children = null;
				}
				update(paths[i]);
				//update(root);
			}
		}
	}


////**** FIN PATH




//////*FUNCION SEARCH*////

	function searchTree(obj,search,path){
		console.log("serach **************************",obj);
		if(obj.data.name === search){ //if search is found return, add the object to the path and return it
			path.push(obj);
			return path;
		}
		else if(obj.children || obj._children){ //if children are collapsed d3 object will have them instantiated as _children
			var children = (obj.children) ? obj.children : obj._children;
			for(var i=0;i<children.length;i++){
				path.push(obj);// we assume this path is the right one
				var found = searchTree(children[i],search,path);
				if(found){// we were right, this should return the bubbled-up path from the first if statement
					return found;
				}
				else{//we were wrong, remove this parent from the path and continue iterating
					path.pop();
				}
			}
		}
		else{//not the right object, return false so it will continue to iterate in the loop
			return false;
		}
	}



//////*FIN FUNCION SEARCH*////




//////FIN OTRAS FUNCIONES



////////////////NUEVA APOSICION UPDATE

function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();
	
	console.log("NODOS control",nodes);
	
	/*
	 //viene de Arriba (tree)
	 
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

	 ///fin viene
	
	*/
	
    // Compute the new tree layout.
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
		
		/*
		var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
	*/
		
		
		var myTool = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip1")
                  .style("opacity", "0")
                  .style("display", "none");

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
		  console.log("*************HACE CLICK************",d);
          update(d);
        });

    nodeEnter.append("circle")
   		.attr("r", function(d){
			
			
			if (d.children && d.depth==0){
				
				switch(true) {
					case (total<100):
						return '9';
						break;
					case (total>100 && total < 999):
						return '12';
						break;
					default:
						return '15';
				}
				
			}else 
				
			console.log("Esta en NODEENTER*******************")
			
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
			  
			  console.log("%%%%%%% append text !!!!!");
		   if(d.data.name.indexOf("/") >= 1){
			  
			   return "Mixta";
			   
		   }
		   else{return d.data.name }
		   
	  
		   
	   }
	      
	
	   )
	   
	
		   
	  
	   /*
	   .on("mouseover",function(d){
		 d3.select(this)    
		  .append("title")
		  .html(function(d){
			 if (typeof(d.data.children)== 'undefined'){
				var id_titulo =d.data.name
			  return "Titulo :" + titulos[id_titulo];
			 }
			 
		  });
	 })
	 */
	
	   
	    .on("mouseover", function(d){  //Mouse event
		if (typeof(d.data.children)== 'undefined'){
				var id_titulo =d.data.name;
				titulo =  titulos[id_titulo];
                d3.select(this)
                    .transition()
                    .duration(500)
					
                    //.attr("x", function(d) { return x(d.cocoa) - 30; })
                    .style("cursor", "pointer")
                    .attr("width", 60)
                    myTool
                      .transition()  //Opacity transition when the tooltip appears
                      .duration(500)
                      .style("opacity", "1")                           
                      .style("display", "block")  //The tooltip appears

                    myTool
					
                      .html(titulo )
                     .style("left", (d3.event.pageX ) + "px")   
                      .style("top", (d3.event.pageY) + "px")
		}
              })
			  
			   .on("mouseout", function(d){  //Mouse event
                d3.select(this)
                    .transition()
                    .duration(500)
                    //.attr("x", function(d) { return x(d.cocoa) - 20; })
                    .style("cursor", "normal")
                    .attr("width", 40)
                    myTool
                        .transition()  //Opacity transition when the tooltip disappears
                        .duration(500)
                        .style("opacity", "0")            
                        .style("display", "none")  //The tooltip disappears
              });
		
   //console.log("**********veamos  node****",nodeEnter);
	  
	   
	    nodeEnter.append('text')
					/*
			        .attr('x', function(d){
						if( d.children && d.children.length>=10) return -8;
						else if(d.children) return -3;
						
						if( d._children && d._children.length>=10) return -8;
						else if(d._children) return -3;
					})
					*/
					
			        .attr('y', 3)
			        .attr('cursor', 'pointer')
			        .style('font-size', '10px')
			        .text(function(d) {
						 //total =0;
						console.log("dddd appnde TEXT*******************",d);
						
			        	if (d.children && d.depth==0) return total; //d.children.length;
			        	else if (d._children) //return   //valores_nodos[d.data.name]    //d._children.length;
						{
							
							//return d._children.length;
							console.log("valores D",d);
							if(d.depth ==1){
								return valores_nodos[d.data.name] ;
							}
							if(d.depth==2){
								subtotal =0;
								/*
								if (typeof(subtotal) == 'undefined') {
								subtotal =0;}	
									else{subtotal = subtotal+1}
									*/
									nodos_desc = d.descendants();
								console.log("decendientes",nodos_desc)
							
							for(i=0;i<nodos_desc[0]._children.length;i++){
								subtotal = subtotal + nodos_desc[0]._children[i]._children.length;
							};
								
								/*
								nodos_desc.forEach(function(n){
									console.log(n.data.name, "longitud children cada descendiente",n._children.length);
									
									for(i=0;i<n._children.length;i++){
										//if( n._children[i].hasOwnProperty("._children") && n._children[i]._children !== "undefined" && n._children[i]._children.hasOwnProperty("length") )
									if( n._children[i]._children != "undif" )
										{
										subtotal = subtotal + n._children[i]._children.length;
										console.log("cada uno ",i, " -- ", n.data.name , " ---",  n._children[i], " -- ", n._children[i]._children)
										
										}else{
											//subtotal = subtotal+n._children.length
											subtotal = subtotal+1;
											}
									}
									
								})
								*/
								//console.log("SUBTOTAL: ",subtotal);
								d.value = subtotal;
								console.log("d value ", d.value);
								return subtotal;
							}
							
							if(d.depth ==3){
								
								return d._children.length;;
							}
							
							return d._children.length;
							
							//desc = d.descendants();
							//console.log("des",desc);
							//console.log("The descendants are: "+d.descendants().map( d1 => d1.data.name ));
						
						/*
						d.sum(function(d1){ return d1.children.length; });
							total =	 total+d.value 
							console.log("d name " ,d.value );
							console.log("deep ",d.height)
							return total;
							
							*/
							//console.log("childre. ",d3.sum(d.data.children.length))
							
							//console.log("adentro",d.name.length);
							/*
							for(i=0;i<d._children.length;i++){
								console.log("adentro" ,d._children[i].length);
							}
							*/
							
						}
			        })
					
					.attr('x', function(d){
						if(d.depth ==1){
						if(valores_nodos[d.data.name] > 100) return -10;
						else if(valores_nodos[d.data.name] > 10) return -5;
						else return -3
						}
						if(d.depth ==3){
							if(d._children.length>100) return -8;
							else if(d._children.length>10) return -5;
							else return -3;
						}
						if(d.depth==2){
							if(d.value > 100) return -8;
							else if(d.value > 10) return -5
						else return -3;
						}
						
						if( d.children && d.children.length>=10) return -8;
						else if(d.children) return -3;
						
						if( d._children && d._children.length>=10) return -8;
						else if(d._children) return -3;
						
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
        .attr("d", diagonal)
		
		.style("stroke",function(d){
			console.log("elemme stroke", d)
				if(d.target.class!="" ){
					return d.target.class;
				}
			})
			
		//stroke-width="2" fill-opacity="0.5"	
		.style("stroke-width", function(d){
			if(typeof d.target.class!="undefined" ){
					return 4;
				}else {return 1;}
		})
	/*
		.style("stroke",function(d){
			console.log("elemme stroke", d)
				if(d.target.class==="found" ){
					if(typeof colorFind !== 'undefined'){
					//return "#ff4136";
					return colorFind
					}else  
						return "#ff4136";
					d.target.color = colorFind;
					d.target.class = "xxx";
				}
			});
		*/
		
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
	
	
	
  }  //fin update


////////////////FIN NUEVA UPDATE


///////funcion colorDepth




function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}


function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

/////fin funcion colorDepth


function creaTree(data){
	
	data.forEach(function(d){
	objItem = {};
	objItem.name = d.key;
	//subchildren =[];
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
	
return treeObj	
}



senado ("senado.csv");