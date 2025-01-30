hotelMod.controller("BookingGuestController", function ($scope, SiteService) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.name = "Shiv";
    $scope.$watch('guestForm.$valid', function (value) {
        console.log("value => ", value);
        $scope.isFormValid = value;
        $scope.IsSubmitted = value;
    });

 
    $scope.isFilled = false;
    $scope.submitAttempts = 0;


    $scope.mobileNumberPattern = /^\d{10}$/; //regular expression padh lena  //ng pattern
    $scope.aadhaarPattern = /^\d{12}$/;
    $scope.emailId = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    var obj = {
    }
        obj.id;
        obj.name;
    obj.age;

    
    
    var obj1 = { id: 22, name: "Hayley", age: 19 }  ;
    var arrayOfObject = [];
    arrayOfObject.push(obj);
    arrayOfObject.push(obj1);
    $scope.missShivani = arrayOfObject;
    console.log(arrayOfObject);


    var data = [];      //var data ko function se bahar rakhe hai vs jab andar tha , dono case mein kya difference tha? debugger laga k check krna
    $scope.add = () => {
        var obj = {
            id: $scope.Id,
            name: $scope.Name,
            age: $scope.Age,
        };
        /*var data = []; */    //var data yaah pe tha
        data.push(obj);
        $scope.Prop = data;
    }



    $scope.delete = (x) => { 
        console.log("x =>", x);
        $scope.Prop = x.id;
        var indexToDelete = data.findIndex(item => item.id === $scope.Prop);
        if (indexToDelete !== -1) {
            data.splice(indexToDelete, 1);
        }
        $scope.Prop = data;
    };


    $scope.deleteMultiGuest = (x) => {
        //console.log("delete guest = ", x);
        $scope.deleteAadhaaar = x.AadhaarNumber;
        var deleteMulti = additionalGuest.findIndex(item => item.AadhaarNumber === $scope.deleteAadhaaar);
        if (deleteMulti !== -1) {
            $scope.allMultiGuest.splice(deleteMulti, 1);
        }
    }

  /*  $scope.formData = {};*/
    $scope.SUBMIT = () => {
        $scope.submitAttempts++;
        console.log("form =>", $scope.guestForm);
        if ($scope.guestForm.$valid) {
                var Obj = {
                    GuestName:$scope.GuestName,
                    Email: $scope.GuestEmail,
                    AddressDetail: $scope.GuestAddress,
                    StateName: $scope.GuestState,
                    AadhaarNumber: $scope.GuestAadhaar,
                    MobileNumber: $scope.GuestMobile,
                    EmployeeID: $scope.empCodee,
                    Num_Of_Guest: $scope.NumOfGuest,
                    RoomID: $scope.Roomid,
                    AdditionalGuestsList: $scope.allMultiGuest,
            };
           
                SiteService.postBookGuestData(Obj)
                    .then((response) => {
                        if (response.data.Message == "Success") {
                            toastr.success("Data Submitted Successfully");
                            $scope.getViewDetails();

                            //$scope.formSubmit();
                            $scope.GuestName = null;
                            $scope.GuestEmail = null;
                            $scope.empCodee = null;
                            $scope.GuestAddress = null;
                            $scope.empCodee = null;
                            $scope.GuestState = null;
                            $scope.GuestMobile = null;
                            $scope.GuestAadhaar = null;
                            $scope.NumOfGuest = null;
                            $scope.resetform();
                            $scope.IsSubmitted = false;
                        }
                        else {
                            toastr.error(response.data.Message);
                        }
                    },

                        (err) => {
                            toastr.error(err.data.Message);

                        }
                    )

                if ($scope.guestForm.$invalid) {
                    if ($scope.submitAttempts > 1) {
                        toastr.error("Validation Error  \n Some fields need to be filled");
                    }
                }   

        }
        else {
                toastr.error ("Please fill all the highlighted fields!") ;
                $scope.isFormValid = true;
                $scope.IsSubmitted = true;
        }

    };

    //ng-change
    $scope.onRoomChange = () => {
        console.log("change happend");
    }
  


 
    $scope.Save_Prop = () => {
        console.log("Prop",$scope.Prop);
        SiteService.Save_Prop($scope.Prop)
            .then((response) => {
                if (response.data.Message == "Success") {
                    toastr.success("data submitted successfully");
                }
                else {
                    toastr.error(response.data.Message);
                }
            },
                (err) => {
                    toastr.error(err.data.Message);


                })
    };




    $scope.getViewDetails = () => {
        SiteService.getBookingListData()
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.manageBook = response.data.manageList;
                    //console.log("Bookinglist", manageBook);
                    
                }
                else {
                    alert(response.data.Message);
                }

            },
                (err) => {
                    alert(err.data.Message);
                })
    };
    $scope.getViewDetails();

    var additionalGuest = [];
    
    $scope.addMultipleGuest = () => {
        /*$scope.guestForm.$valid == true;
        $scope.IsSubmitted = false;
        $scope.guestForm.GuestName.$error.required = false;*/
        console.log("additionalGuest length", additionalGuest.length);
        if ($scope.NumOfGuest-1 <= additionalGuest.length) {
            toastr.error("Max number of guests reached");
            return;
        }
        
        $('#MultipleGuestModal').modal('show');
        $scope.newGuestName = undefined;
        $scope.newGuestEmail = undefined;
        $scope.newGuestAddress = undefined;
        $scope.newGuestState = undefined;
        $scope.newGuestAadhaar = undefined;
        $scope.newGuestMobile = undefined;
        $scope.newRoomNo = undefined;
    };

    let i = 0;
    $scope.addAdditionalGuests = () => {
        console.log("$scope.additionalGuests => ", $scope.additionalGuests);
        if ($scope.additionalGuests.$valid) {

            var obj = {

                GuestName : $scope.newGuestName,
                Email : $scope.newGuestEmail,
                AddressDetail : $scope.newGuestAddress,
                StateName : $scope.newGuestState,
                AadhaarNumber : $scope.newGuestAadhaar,
                MobileNumber: $scope.newGuestMobile,
                RoomNum: $scope.newRoomNo,
            };

            toastr.success("success");
            additionalGuest.push(obj);
            $scope.allMultiGuest = additionalGuest;
            $('#MultipleGuestModal').modal('hide');
        }
        else {
            toastr.error("invalid");
            $scope.IsSubmittedAdditional = true;
        }
        
    };

    $scope.resetform = () => {
        var form = document.getElementById("bookingGuest");
        /*form.reset();*/
        $scope.guestForm.$setPristine();
        $scope.guestForm.$setUntouched();
        form.reset();

    }
    


    $scope.addService = (x) => {
        console.log("x addservice", x);
        $scope.addBookingGuestId = x.BOOKINGUESTID;
        $scope.BookingId = x.BOOKINGID;
        $scope.addBgId = x.BOOKINGCODE;
        $scope.GuestId = x.GuestID;
        $scope.addGuestName = x.GuestName;
        $('#addServices').modal('show');
        $scope.refreshModal();

        $scope.GetGuestList();
    };


    $scope.add = () => {
        var obj = {
            BookingGuestId: $scope.addBookingGuestId, 
            GuestID: $scope.addGuestName,
            ServiceID: $scope.updatedServiceID,
            Quantity: $scope.qtService,
            TotalBill: $scope.totalServiceAmount,
        };

        console.log("obj", obj);

        SiteService.PostAddServiceData(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    alert("Form Updated Successfully");
                    
                }
                else {
                    alert(response.data.Message);
                }
            },
                (err) => {
                    alert(err.data.Message);

                })
    };




    $scope.GetServiceList = () => {

        SiteService.getServiceData()
            .then(function (response) {
                if (response.data.Message == "Success") {

                    $scope.AllServices = response.data.serviceListdata;
/*                    var price = $scope.AllServices.PRICE;
*/                    console.log("all service => ",$scope.AllServices);
                }
                else {
                    alert("error");
                }
            },

                (err) => {
                    alert(err);
                    console.log(err);

                })
    };
    $scope.GetServiceList();


    $scope.GetGuestList = () => {
        SiteService.getFilteredGuestData($scope.BookingId)

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



    $scope.serviceChange = () => {

       /* let service = $scope.AllServices.find(x => x.SERVICEID == $scope.updatedServiceID);
        $scope.serviceAmount = service.PRICE;*/

        $scope.serviceAmount = $scope.AllServices.find(x => x.SERVICEID == $scope.updatedServiceID).PRICE;


    };

    $scope.calquantity = () => {
        let calculation = $scope.qtService * $scope.serviceAmount;
        $scope.totalServiceAmount = calculation;
    }

    $scope.viewDetail = (BOOKINGID) => {
        $scope.payBookId = BOOKINGID;
        window.location.href = '/NiceAdmin/ManageBooking?HotelPaymentBookID=' + $scope.payBookId;
    }

    $scope.EDITService = (BOOKINGUESTID) => {
       /* console.log("bg", BOOKINGUESTID);*/
        $scope.hotelBgId = BOOKINGUESTID;
        window.location.href = '/NiceAdmin/AdditionalService?hotelBookingGuestId=' + $scope.hotelBgId;
    }

    $scope.refreshModal = () => {
        $scope.updatedServiceID = "";
        $scope.qtService = "";
        $scope.serviceAmount = "";
        $scope.totalServiceAmount = "";
    }
});