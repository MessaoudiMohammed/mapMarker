const mapMarker=(querySelector,options={
	urlSvg:"http://charts-displayer.rf.gd/wp/wp-content/uploads/2020/01/map.svg",
		dataMarker:[],
		layout:{
			width:"574",
			height:"574",
			viewBox:"0 0 750 750"
		},
		colors:{
			border:"transparent",
			background:"#ccc",
			backgroundHover:"#1a7fd0",
			borderHover:"transparent",
			mark:"yellow"
		},
})=>{
	$(querySelector).css("visibility","hidden");
	if(options.urlSvg===undefined||options.urlSvg===""||options.urlSvg===null)
		return;
	$.ajax({
		url:options.urlSvg,
		success:resp=>{
			const MapSVG= $(resp).find("svg");
			if(options.layout!=undefined&&options.layout.width!=undefined)
				$(MapSVG).attr("width",options.layout.width);
			if(options.layout!=undefined&&options.layout.height!=undefined)
				$(MapSVG).attr("height",options.layout.height);
			if(options.layout!=undefined&&options.layout.viewBox!=undefined)
				$(MapSVG).attr("viewBox",options.layout.viewBox);
			$(querySelector).each((index,item)=>{
				if(options.colors!=undefined&&options.colors.background!=undefined)
					$(MapSVG).find("path").css("fill",options.colors.background)
				if(options.colors!=undefined&&options.colors.border!=undefined)
					$(MapSVG).find("path").css("stroke",options.colors.border)
				if(options.colors!=undefined&&options.colors.backgroundHover!=undefined){
					$(MapSVG).find("path").mouseover(event=>{
						if(options.colors.backgroundHover)
							$(event.currentTarget).css("fill",options.colors.backgroundHover);
						else
							$(event.currentTarget).css("fill","#ccc");
						if(options.colors.borderHover)
							$(event.currentTarget).css("stroke",options.colors.borderHover);
						else
							$(event.currentTarget).css("stroke","#ccc");
					});
					$(MapSVG).find("path").mouseout(event=>{
						if(options.colors.background){		
							let item=options.dataMarker.filter((item)=>item.id===$(event.currentTarget).attr("id"));
							item=item[0];
							if(item!=undefined&&item.background!=null&&item.background!=undefined&&item.background!="")	
								$(event.currentTarget).css("fill",item.background);
							else
								$(event.currentTarget).css("fill",options.colors.background);
						}
						else
							$(event.currentTarget).css("fill","#ccc");
						if(options.colors.border)
							$(event.currentTarget).css("stroke",options.colors.border);
						else
							$(event.currentTarget).css("stroke","#ccc");
					})
				}		
				if(options.dataMarker.length>0){
					options.dataMarker.forEach(item=>{
						if(item.title!==undefined&&item.title!==null)
						{
							$(querySelector).append(`
								<div class="mark-item ${item.contentPos} ${item.contentPosHover}" data-target="${item.id}" data-position-y="${item.pos.y}" data-position-x="${item.pos.x}">
									<span class="mark"></span>
									<div>
										<h6>${item.title}</h6>
										<p>${item.description}</p>
									</div>
								</div>`);
						}						
						if(item.data!==undefined&&item.data!==null&&item.data.length>0)
						{
							item.data.forEach(subitem=>{
								if(subitem.title!==undefined&&subitem.title!==null)
								{
									$(querySelector).append(`
									<div class="mark-item ${subitem.contentPos} ${subitem.contentPosHover}" data-target="${item.id}" data-position-y="${subitem.pos.y}" data-position-x="${subitem.pos.x}">
										<span class="mark"></span>
										<div>
											<h6>${subitem.title}</h6>
											<p>${subitem.description}</p>
										</div>
									</div>`);
								}
							});
						}
						if(item.background!=undefined&&item.background!=null&&item.background!=""){
							$(MapSVG).find("#"+item.id).css({"fill":item.background})
						}
							
					});
				}
				
				$(item).append($(MapSVG));
				
			});
			var poschecker=setInterval(()=>{
				$(".mark-item").each((index,item)=>{
				$(item).css({
					position:'absolute',
					top:(eval(parseFloat($("#"+$(item).attr("data-target")).offset().top).toFixed(2))+parseFloat($(item).attr("data-position-y")))+"px",
					left:(eval(parseFloat($("#"+$(item).attr("data-target")).offset().left).toFixed(2))+parseFloat($(item).attr("data-position-x")))+"px"
				});
				$(querySelector).css("visibility","visible");
			})
			},1000);
		},
		error:err=>console.log(err)
	});
}
