$(document).ready(function() {

 interactive();

});

function interactive() {
	  //create HTML
	  //find cells in html tables to hide
	  $("td:contains('{hide}')").each(function (index) {
			var checkText = $(this).text().trim();
			checkText = checkText.replace("{hide}", "");
			$(this).data("answer", checkText);
			$(this).html("");
			$(this).attr('contenteditable','true');
			$(this).addClass("anscheck");
			$(this).addClass("docactive");
	  });

 //find input boxes to create
    $("p:contains('{input}')").each(function (index) {
        var checkText = $(this).text().trim();
        var parts = checkText.split("{input}");
        var ans_ops = [];
        for(var i = 1; i < parts.length; i++)
        {
           var reText = "{input}" + parts[i];

           var ans = reText.match("{input}(.*){/input}");
           var new_class = "anscheckval";
           var check = ans[1].split("||");
           var check2 = ans[1].split(",");
           var font_size = 15;
           var fixed_size = 5;
           if(check.length == 2){new_class = "anscheckvals";}
           if(check2.length > 1){new_class = "anscheckops";}
            //need to autosize
            var box_width = 15;
            if(new_class == "anscheckval")
              {box_width = ans[1].length*font_size + fixed_size;}
            if(new_class == "anscheckvals")
            {
              //check all options
              for(var j = 0; j < check.length; j++)
              {
                 if(check[j].length*font_size > box_width)
                 {
                    box_width = check[j].length*font_size + fixed_size;
                 }
              }
            }
            if(new_class == "anscheckops")
            {
              for(var j = 0; j < check2.length; j++)
              {
                 if(check2[j].length*font_size > box_width)
                 {
                    box_width = check2[j].length*font_size + fixed_size;
                 }
              }
            }
            ans_ops.push(ans[1]);
          //need to create an element to append rather than text
            var newInput = "<input type='text' class='" + new_class + " docactive' style='width:" + box_width + "px'>";
             reText = reText.replace(ans[0], newInput);
            parts[i] = reText;

        }
        var merged = parts.join("");
        $(this).html(merged);
        $(this).find("input").each(function (index) {
            $(this).data("answer", ans_ops[index]);
        })
  });

 //find select dropdowns to create
    $("p:contains('{select}')").each(function (index) {
        var checkText = $(this).text().trim();
        var parts = checkText.split("{select}");
          var ans_ops = [];
        for(var i = 1; i < parts.length; i++)
        {
           var reText = "{select}" + parts[i];

           var ans = reText.match("{select}(.*){/select}");
           var new_class = "anscheckdrop";
           var check = ans[1].split(",");
           var ans_val = check[0];
           shuffle(check);

            ans_ops.push(ans_val);
           //need to create an element to append rather than text
           var newInput = "<select class='" + new_class + " docactive'><option></option>";

              //check all options
              for(var j = 0; j < check.length; j++)
              {
                 newInput = newInput + "<option>" + check[j] + "</option>";
              }
            newInput = newInput + "</select>";

            reText = reText.replace(ans[0], newInput);
            parts[i] = reText;

        }
        var merged = parts.join("");
        $(this).html(merged);
        $(this).find("select").each(function (index) {
            $(this).data("answer", ans_ops[index]);
        })
  });

	  //find MCQ questions to create
	   $("li:contains('{MCQ}')").parent().each(function (index) {
			 $(this).addClass("MCQ");
			  var lis = $(this).find('> li');
			  for(var i = 0; i < lis.length; i++)
			  {
				  var checkText = $(lis[i]).html();
				  var checkJustText =  $(lis[i]).text();
				  var parts = checkText.split("||");
				  var partsText = checkJustText.split("||");
				  var correct = 0;
				  if(parts.length > 1 && partsText[1] == 1)
				  {
					   correct = 1;
				  }
				  $(lis[i]).data("answer", correct);
				  $(lis[i]).addClass("MCQcheck");
				  $(lis[i]).addClass("docactive");
				  $(lis[i]).html(parts[0]);
				  if($(lis[i]).text() == "{MCQ}" || $(lis[i]).text() == "{/MCQ}"){$(lis[i]).remove();}
			  }
	  });

	   //hide reveal paragraphs
	   $(".reveal").each(function (index) {
			var checkText = $(this).html();
			var newInput = "<span class='clickreveal'><span class='click'>Click to reveal</span><blockquote class='revealanswer'>" + checkText +  "</blockquote></span>";
			$(this).html(newInput);
	  });
	  $(".revealanswer").hide();


    //----------------------------------
	  //create events
	  //-----------------------------------

	  $("#showAnswers").click(function(){
	     var buttonText = $(this).text().trim();
	     if(buttonText == "Show all answers"){
	       $(this).text("Hide all answers");
	       // open all the details tabs
	       $('details').attr('open','').addClass("correct");
	       // reveal all the reveals
	       $(".revealanswer").show();
	       // get all the things with class docactive
	       $("span.glyphicon").remove();
	       $(".docactive").each(function (index) {
	         if($(this).hasClass("MCQcheck"))
	         {

	           if($(this).data("answer") == 1)
	           {
	              $(this).addClass("correct");
		            $(this).append(" <span class='glyphicon glyphicon-ok' aria-hidden='true'></span>");
		            $(this).removeClass("wrong");
	           }
	           else
	           {
	              $(this).addClass("wrong");
		            $(this).append(" <span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
		            $(this).removeClass("correct");
	           }
	         }
	         if($(this).hasClass("anscheck"))
	         {
	           $(this).addClass("correct");
	           $(this).text($(this).data("answer") );
	         }
	         if($(this).hasClass("anscheckdrop"))
	         {
	           $(this).addClass("correct");
	           $(this).val($(this).data("answer"));
	         }

	         if($(this).hasClass("anscheckval"))
	         {
	           $(this).addClass("correct");
	           $(this).val($(this).data("answer") );
	         var value = $(this).val();
            var size = value.length;
            var font_size = 15;
            var fixed_size = 5;
            box_width = size*font_size + fixed_size;
            $(this).css('width',box_width);
	         }
	         if($(this).hasClass("anscheckvals"))
	         {
	           $(this).addClass("correct");
	           var vals = $(this).data("answer");
	           vals = vals.replace("||"," to ");
	           $(this).val("Answers accepted between " + vals);
	              var value = $(this).val();
            var size = value.length;
            var font_size = 10;
            var fixed_size = 5;
            box_width = size*font_size + fixed_size;
            $(this).css('width',box_width);
	         }
	         if($(this).hasClass("anscheckops"))
	         {
	           $(this).addClass("correct");
	           var vals = $(this).data("answer");
	           vals = vals.replace(","," or ");
	           $(this).val(vals);
	              var value = $(this).val();
            var size = value.length;
            var font_size = 10;
            var fixed_size = 5;
            box_width = size*font_size + fixed_size;
            $(this).css('width',box_width);
	         }
	       })
	     }
	     else
	     {
	       $(this).text("Show all answers");
	       window.location.reload(true);
	     }
	  })

	  $(".anscheckdrop").change(function(){
	    var ans = $(this).val();
	    var correct = $(this).data("answer");
	    if(ans == correct){
			   $(this).addClass("correct");
			   $(this).removeClass("wrong");
			}
			else
			{
			   $(this).addClass("wrong");
			   $(this).removeClass("correct");
			}

	  })

	  $(".anscheck").keyup(function(){
			var ans = $(this).html().trim().toLowerCase();;
			var correct = $(this).data("answer").trim().toLowerCase();;
			if(ans == correct){
			   $(this).addClass("correct");
			   $(this).removeClass("wrong");
			}
			else
			{
			   $(this).addClass("wrong");
			   $(this).removeClass("correct");
			}
	  });

	  $(".anscheckval").keyup(function(){
	  var ans = $(this).val();
	  var correct = $(this).data("answer");

	  var same = 0;
	  if(ans == correct){same = 1;}
	  if(isNaN(ans) && isNaN(correct)){
	  if(ans.toLowerCase() == correct.toLowerCase()){same = 1;}
	  }

	  if(same == 1)
	  {
		 $(this).addClass("correct");
		 $(this).removeClass("wrong");
	  }
	  else
	  {
		$(this).addClass("wrong");
		$(this).removeClass("correct");
	  }
	  });


	 $(".anscheckvals").keyup(function(){
	  var ans = $(this).val();
	  var correct = $(this).data("answer");

	  //check if range given
	  var rangey = correct.split("||");
	  var correct1 = rangey[0]*1;
	  var correct2 = rangey[1]*1;

	  if(ans >= correct1 && ans <= correct2)
	  {
		 $(this).addClass("correct");
		 $(this).removeClass("wrong");
	  }
	  else
	  {
		$(this).addClass("wrong");
		$(this).removeClass("correct");
	  }
	  });

	    $(".anscheckops").keyup(function(){
  var ans = $(this).val().trim().toLowerCase();
  var correct = $(this).data("answer");

  //check if options given
  var rangey = correct.split(",");
  var correct_ans = 0;
  for(var i = 0; i < rangey.length; i++)
  {
     if(rangey[i].trim().toLowerCase() == ans){correct_ans = 1; break;}
  }

  if(correct_ans == 1)
  {
     $(this).addClass("correct");
     $(this).removeClass("wrong");
  }
  else
  {
    $(this).addClass("wrong");
    $(this).removeClass("correct");
  }
  });

	  //trigger revealing answer
		$(".clickreveal").click(function() {
		$(this).find(".revealanswer").show();
		$(this).find(".click").hide();
	});

	//trigger answer checking MCQ
		$(".MCQcheck").click(function() {
		var correct = $(this).data("answer");
		if($(this).hasClass("correct") || $(this).hasClass("wrong") ){
		  //should work out how to negate
		}
		else
		{
		  if(correct == 1){
		   $(this).addClass("correct");
		   $(this).append(" <span class='glyphicon glyphicon-ok' aria-hidden='true'></span>");
		   $(this).removeClass("wrong");
		  }
		  else
		  {
		   $(this).addClass("wrong");
		   $(this).append(" <span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
		   $(this).removeClass("correct");
		  }
		}
	});
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
