hotelMod.controller("RoomTypeController", function ($scope, SiteService) {
   
    $scope.GetRoomTypeList = () => {
        SiteService.getRoomTypeList()
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.AllRoomTypeList = response.data.roomTypeList;
                }
                else {
                    alert(response.data.Message)
                }
            },
                (err) => {

                    alert(err.data.Message);

                })
    };
    $scope.GetRoomTypeList();


    $scope.Submit = () => {

        var obj = {
            RoomTypeName: $scope.roomTypeName,
            BaseRate: $scope.roomPrice,
            MaxOccupancy: $scope.roomMaxOccupancy,
            Descriptions: $scope.roomDescription,
        };

        SiteService.postRoomTypeList(obj)
        .then((response) => {
            if (response.data.Message == "Success") {
                toastr.success("Data submitted Successfully");
                $scope.GetRoomTypeList();
            }
            else {
                toastr.error(response.data.Message);
            }
        },
            (err) => {
                toastr.error(err.data.Message);
            })

    };



    $scope.Edit = (x) => {
        $scope.updatedRoomTypeID = x.ROOMTYPEID;   
        $scope.updatedRoomTypeName = x.ROOMTYPENAME;
        $scope.updatedPrice = x.PRICE;
        $scope.updatedMaxOccupancy = x.MAXOCCUPANCY;
        $scope.updatedDescription = x.DESCRIPTIONS;
        $("#updateModal").modal('show');
    };

    $scope.Update = () => {
        var obj = {
            RoomTypeID: $scope.updatedRoomTypeID, 
            RoomTypeName: $scope.updatedRoomTypeName,
            BaseRate: $scope.updatedPrice,
            MaxOccupancy: $scope.updatedMaxOccupancy,
            Descriptions: $scope.updatedDescription,
        };

        SiteService.updateRoomTypeList(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    toastr.success("Data Updated Successfully");
                    $scope.GetRoomTypeList();
                }
                else {
                    toastr.error(response.data.Message);
                }

            },
                (err) => {
                    toastr.error(err.data.Message);
                })

    };

       


    $scope.delete = (x) => {
        $scope.deleteID = x.ROOMTYPEID;
        $("#deleteModal").modal('show');
    }

    $scope.Delete = () => {
        var obj = {
            RoomTypeID: $scope.deleteID,
        }

        SiteService.deleteRoomTypeList(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    toastr.success("Data Deleted Successfully");
                    $scope.GetRoomTypeList();
                }
                else {
                    toastr.error(response.data.Message);
                }

            },
                (err) => {
                    alert(err.data.Message);
                })
    };

});