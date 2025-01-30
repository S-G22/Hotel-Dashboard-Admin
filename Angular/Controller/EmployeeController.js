hotelMod.controller("EmployeeController", function ($scope, SiteService) {

    /*$scope.$watch('employeeForm.$valid', function (value) {
        $scope.isFromValid = value;
        $scope.isSubmitted = value;
    });*/

    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.isFilled = false;
    $scope.submitAttempts = 0;

    $scope.mobileNumberPattern = /^\d{10}$/;
    $scope.aadhaarPattern = /^\d{12}$/;
    $scope.emailId = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    $scope.passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    $scope.GetEmployeeList = () => {

        SiteService.getEmployeeListData()
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.AllEmployeeList = response.data.employeeList;
                  /*  var a = response.data.employeeList;*/
                    //console.log("list", a);
                }
                else {
                    alert(response.data.Message);
                }
            },

                (err) => {
                    alert(err.data.Message);

                })
    };

    $scope.GetEmployeeList();


    $scope.submit = () => {
        $scope.submitAttempts++;
        if ($scope.employeeForm.$valid) {

            var obj = {
                EmployeeName: $scope.name,
                Email: $scope.email,
                AadhaarNumber: $scope.aadhaar,
                JobRole: $scope.jobRole,
                MobileNumber: $scope.mobile,
                Passwords: $scope.passwords,

            };

            SiteService.PostEmployeeListData(obj)
                .then((response) => {
                    if (response.data.Message == "Success") {
                        toastr.success("Data is Submitted SuccessFully");
                        $scope.GetEmployeeList();
                    }
                    else {
                        toastr.error(response.data.Message);
                    }
                },
                    (err) => {
                        toastr.error(err.data.Message);
                    })

            if ($scope.employeeForm.$invalid) {
                if ($scope.submitAttempts > 1) {
                    toastr.error("Validation Error \n Some fields need to be filled");
                }
            }

        }

        else {
            toastr.error("Please fill all the highlighted fields!");
            $scope.isFromValid = true;
            $scope.isSubmitted = true;
        }

    };



    $scope.Edit = (x) => {
      /*  console.log("x",x) ;*/
        $scope.updatedEmployeeId = x.EMPLOYEEID;
        $scope.updatedEmployeeName = x.EMPLOYEENAME;
        $scope.updatedEmail = x.EMAIL;
        $scope.updatedJobRole = x.JOBROLE;
        $scope.updatedAadhaar = x.AADHAARNUM;
        $scope.updatedMobile = x.MOBILE;
        $('#updateModal').modal('show');

    }

    $scope.Update = () => {
        var obj = {
            EmployeeID: $scope.updatedEmployeeId,
            EmployeeName: $scope.updatedEmployeeName,
            Email: $scope.updatedEmail,
            AadhaarNumber: $scope.updatedAadhaar,
            JobRole: $scope.updatedJobRole,
            MobileNumber: $scope.updatedMobile,
        };

        SiteService.UpdateEmployeeListData(obj)
        .then((response) => {
            if (response.data.Message == "Success") {
                alert("Form Updated Successfully");
                $scope.GetEmployeeList();
            }
            else {
                alert(response.data.Message);
            }
        },
            (err) => {
                alert(err.data.Message);

            })
    };





    $scope.deleteModal = (x) => {

        console.log("x =>", x);
        $('#deleteModal').modal('show');
        $scope.deleteId = x.EMPLOYEEID;
    };


    $scope.Delete = () => {
        var obj = {
            EmployeeID: $scope.deleteId
        };

        SiteService.DeleteEmployeeListData(obj)
        .then((response) => {
            if (response.data.Message == "Success") {
                alert("Record deleted Successfully");
                $scope.GetEmployeeList();
            }
            else {
                alert(response.data.Message);
            }
        },
            (err) => {
                alert(err.data.Message);
            }
        )
    }


});