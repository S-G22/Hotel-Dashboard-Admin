
hotelMod.controller("CustomerController", function ($scope, SiteService) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.$watch('custForm.$valid', function (value) {
        $scope.isFormValid = value;
        $scope.isSubmitted = value;
    });

    $scope.isFilled = false;
    $scope.submitAttempts = 0;

    $scope.mobileNumberPattern = /^\d{10}$/; 
    $scope.aadhaarPattern = /^\d{12}$/;
    $scope.emailId = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    $scope.GetGuestList = () => {
    
        SiteService.getGuestData()

            .then(function (response) {

                if (response.data.Message == "Success") {
                    $scope.AllGuestList = response.data.guestList;
                }
                else {
                    alert(response.data.Message);
                }
            },

                (err) => {
                    alert(err.data.Message);


                })
    };
    $scope.GetGuestList();


    $scope.Submit = () => {

        $scope.submitAttempts++;
     /*   console.log("form =>", $scope.custForm);*/
        if ($scope.custForm.$valid) {

            var obj = {
                EmployeeID: $scope.empcode,
                GuestName: $scope.name,
                Email: $scope.email,
                AddressDetail: $scope.address,
                StateName: $scope.state,
                AadhaarNumber: $scope.aadhaar,
                MobileNumber: $scope.phoneNo,
            };

            SiteService.postGuestData(obj)
                .then((response) => {
                    if (response.data.Message == "Success") {
                        toastr.success("Data submitted successfully");
                        $scope.GetGuestList();
                    }
                    else {
                        toastr.error(response.data.Message);
                    }
                },
                    (err) => {
                        toastr.error(err.data.Message);

                    })


            if ($scope.custForm.$inavlid) {
                if ($scope.submitAttempts > 1) {
                    toastr.error("Validation Error \n Some fields need to be filled");
                }
            }

        }
        else {
            toastr.error("Please fill all the highlighted fields!");
            toastr.isFormValid = true;
            toastr.isSubmitted = true;
        }

    };

  
});