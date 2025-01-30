hotelMod.controller("SystemLoginController", function ($scope, SiteService) {

    $scope.loginDisabled = false;

    $scope.Submit = () => {
        $scope.loginDisabled = true;
        var hashedPassword = CryptoJS.SHA256($scope.Passwords).toString();
        $scope.Passwords = hashedPassword;
        var obj = {
            Username: $scope.Email,
            Password: hashedPassword,
        };
        $scope.dataLoading = true;

        SiteService.systemLogin(obj)
            .then((response) => {
                console.log(response);
                if (response.data.Message == 'Success') {
                    $scope.UserDetails = response.data.UserDetails;
                    window.location.href = "/niceadmin/index";
                }
                else {
                    $scope.loginDisabled = false;

                    alert("Incorrect id or password!");
                }
                $scope.dataLoading = true;
            }), (err) => {
                $scope.loginDisabled = false;

                console.log("here");
                alert(err.data.Message);
            };
    };



    $scope.SignOut = function () {
        window.location.href = ("/NiceAdmin/Login");
    };




});