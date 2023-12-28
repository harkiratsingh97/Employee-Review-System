{
	let createUser = function () {
		let newUserForm = $("#new-user-form");

		newUserForm.submit(function (e) {
			e.preventDefault();

			$.ajax({
				type: "post",
				url: "/employee/create-employee",
				data: newUserForm.serialize(),
				success: function (data) {
					// JWT = data.token;
					if (data.status == 400) {
						console.log("already here");
					}
					window.location.href = "/sign-in";
				},
			});
		});
	};

	createUser();
}
