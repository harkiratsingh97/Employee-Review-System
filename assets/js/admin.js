function addForReview(id, idToAdd) {
	$.ajax({
		type: "put",
		url: `/employee/addForReview/?id=${id}&idToAdd=${idToAdd}`,
		// data: newPostForm.serialize(),
		success: function (data) {
			let feedbackUsersDive = document.getElementById("feedback-givers");
			let str = "possible" + data.data.from_user._id;
			let possibleReviewerLi = document.getElementById(str);
			possibleReviewerLi.remove();
			let newItem = document.createElement("li");
			newItem.id = "reviewer" + data.data.from_user._id;
			newItem.innerHTML =
				data.data.from_user.name +
				`<button value='emp.id' onclick="removeFromReview( '${data.data.to_user}','${data.data.from_user._id}')">Remove</button>`;
			feedbackUsersDive.appendChild(newItem);
		},
		error: function (error) {
			console.log(error.responseText);
		},
	});
}

function removeFromReview(to_user, from_user) {
	$.ajax({
		type: "put",
		url: `/employee/removeFromReview/?id=${to_user}&idToRemove=${from_user}`,
		// data: newPostForm.serialize(),
		success: function (data) {
			let reviewDiv = document.getElementById("possible-for-feedback");
			let str = "reviewer" + data.data.from_user._id;
			let reviewerLi = document.getElementById(str);
			reviewerLi.remove();
			let newItem = document.createElement("li");
			newItem.id = "possible" + data.data.from_user._id;

			newItem.innerHTML =
				data.data.from_user.name +
				`<button value='emp.id' onclick="addForReview( '${data.data.to_user}','${data.data.from_user._id}')">Add</button>`;

			reviewDiv.appendChild(newItem);
		},
		error: function (error) {
			console.log(error.responseText);
		},
	});
}

