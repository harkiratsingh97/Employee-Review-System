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

					window.location.href = "/sign-in";
				},
			});
		});
	};

	createUser();
}
