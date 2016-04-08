var bookDifficulty = new Array(51);
var bookYear = new Array(51);
var bookInfo;

//setting up the svg element
var graph;

var svgHeight = 1980;
var svgWidth = 1250;
var svgMargin = 100;

var xScale = d3.scale.linear().range([0, svgWidth]);
var yScale = d3.scale.linear().range([svgHeight, 0]);

var xAxis = d3.svg.axis().orient("top");
var yAxis = d3.svg.axis().orient("left").tickFormat(d3.format("d"));

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return d.Title_of_novel + " " + " - Book Difficulty: " + d.Book_Difficulty.toFixed(2);
  })

formatData(bookData);
createVis();
updateVis();

function formatData(data)
{
	bookInfo = data;
	for(i=0; i < bookInfo.length; i++)
	{
		bookDifficulty[i] = bookInfo[i].Book_Difficulty;
		bookYear[i] = bookInfo[i].Publication_Year;
	}
	
}

function createVis()
{

	graph = d3.select("#graphics")
		.attr("width", svgWidth + svgMargin * 2)
		.attr("height", svgHeight + svgMargin * 2);

	graph.call(tip);
	
	graph = graph.append("g")
		.attr("transform", "translate(" + svgMargin + "," + svgMargin + ")"); // we are creating this string: translate(50,50)

	graph.append("g")
		.attr("class", "xAxis")
		.attr("transform", "translate(0, 0)")
		.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", 650)
			.attr("y", -60)
			.style("text-anchor", "end");

	graph.append("g")
		.attr("class", "yAxis")
		.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", -80)
            .attr("x", 10)
			.attr("dy", ".71em")
			.style("text-anchor", "end");
			
	graph.selectAll(".bookData").data(bookData)
		.enter()
		.append("g")
		.attr("class", "book")
			.append("circle")
			.style("opacity", 0.6)
}

function updateVis()
{
	var maxValX = d3.max(bookDifficulty);
	var maxValY = d3.max(bookYear);
	var maxValSize = d3.max(bookDifficulty);

	xScale.domain([0, 85]);
	yScale.domain([2017, 1800]);

	graph.selectAll(".book")
		.attr("transform", function(d)
		{
			var xValue = xScale(d.Book_Difficulty);
			var yValue = yScale(d.Publication_Year);
			return "translate(" + xValue + "," + yValue+ ")";
		})
		.attr("fill", function(d)
		{
			if(d.Genre == "YA")
			{
				return "#26A68E"
			}
			else
			{
				return "#911146"
			}
		})
		.select("circle")
			.attr("r", function(d)
			{
				return 20;
			})
			.on("mouseover", tip.show)
			.on("mouseout", tip.hide)
			.on("click", function(d)
			{
				openBookDetails(d);
			})

	 
	xAxis.scale(xScale);
	yAxis.scale(yScale);

	graph.select(".xAxis").call(xAxis)
        .select(".label").text("Book Difficulty");
	graph.select(".yAxis").call(yAxis)
        .select(".label").text("Publication Year");
}

function openBookDetails(book)
{
	var popupWindow = window.open("", book.Title_of_novel + " Details", "width=800, height=600");
	var html = "<html><head><title>" + book.Title_of_novel + " Details</title>"
		+"<link rel = 'stylesheet' type= 'text/css' href='./moreDetails.css'>"
		+"<link href='https://fonts.googleapis.com/css?family=Pontano+Sans' rel='stylesheet' type='text/css'>"
		+"<link href='https://fonts.googleapis.com/css?family=Oxygen:400,300,700' rel='stylesheet' type='text/css'>"
		+"<link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>"
		+"</head>";
	html = html + "<body><div class='pageLayout'>";
	html = html + "<div class='headerArea'>";
	html = html + "<h1>" + book.Title_of_novel + "</h1>";
	html = html + "<h2>" + book.Author + "</h2>";
	html = html + "</div>";
	html = html + "<div class='cover'>";
	html = html + "<img src='" + book.Book_Cover +"'/>";
	html = html + "</div>";
	html = html + "<div class='GeneralInfo'>";
	html = html + "<table>";
	html = html + "<tr>";
	html = html + "<td><b>GoodReads Rating</b></td>";
	html = html + "<td>"+book.GR_rating+"</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>General Opinion</b></td>";
	html = html + "<td>"+book.General_Liking+"% liked it</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>Publication Year</b></td>";
	html = html + "<td>"+book.Publication_Year+"</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>Genre</b></td>";
	html = html + "<td>"+book.Genre+"</td>";
	html = html + "</tr>";
	html = html + "</table></div>";
	
	html = html + "<div class='SpecificDetails'>";
	html = html + "<table>";
	html = html + "<tr>";
	html = html + "<td><b>Reading Level:</b></td>";
	html = html + "<td>"+book.Reading_Level+"</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>Sentences That are Hard to Read:</b></td>";
	html = html + "<td>"+book.Hard_to_Read+"</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>Sentences That are Very Hard to Read</b></td>";
	html = html + "<td>"+book.Very_Hard_to_Read+"</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>Overall Book Difficulty</b></td>";
	html = html + "<td>"+book.Book_Difficulty.toFixed(2)+"</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>Uses of Passive Voice:</b></td>";
	html = html + "<td>"+book.Passive_Voice+"</td>";
	html = html + "</tr>";
	html = html + "<tr>";
	html = html + "<td><b>Uses of Adverbs:</b></td>";
	html = html + "<td>"+book.Adverbs+"</td>";
	html = html + "</tr>";
	html = html + "</table></div>";
	html = html + "</div></body></html>";
	
	popupWindow.document.open();
	popupWindow.document.write(html);
	popupWindow.document.close();
}

//the sexy thing
var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height()/3;
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
