hotelMod.service('SiteService', function ($http) {

    this.getDashboardStats = function () {
        return $http.get('/api/Index/GetDashboardStats');
    };

    //Login
    this.systemLogin = function (obj) {
        return $http({
            method: "post",
            url: "/api/Login/AdminLogIn",
            data: JSON.stringify( obj),
            dataType: "json",
        });
    }

    this.setUserDetail = function (EmployeeDetail) {
        if (typeof (Storage) != null && typeof (Storage) != undefined) {
            localStorage.setItem('EmployeeDetail', JSON.stringify(EmployeeDetail));
            return true;
        }
        else {
            return false;
        }

    }

   /* this.signOut = function () {
        return $http.get("/api/Login/Logout") ;
    }*/




    //Customer (Guests)
    this.getGuestData = function () {
        return $http.get('/api/CustomerDetail/GetGuest');
    };


    this.postGuestData = function (data) {
        return $http({
            method: "post",
            url: "/api/CustomerDetail/PostGuest",
            data: JSON.stringify(data),
            dataType: "json",
        });
    }





    //BookingGuests
    this.postBookGuestData = function (data) {
        console.log("data => ", data);
        return $http({
            method: "post",
            url: "/api/BookingGuest/PostBookGuest",
            data: JSON.stringify(data),
            dataType: "json",
        });
    }

    this.PostAddServiceData = function (data) {
        console.log("data => ",data);
        return $http({
            method: "post",
            url: "/api/BookingGuest/PostAddService",
            data: JSON.stringify(data),
            dataType: "json",
        });
    }

    this.postRoomTypeList = function (data) {
        return $http({
            method: "post",
            url: ('/api/roomType/postRoomType'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }

    this.Save_Prop = (data) => {
        return $http({
            method: "post",
            url: ('/api/BookingGuest/Saveprop'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }


    this.getBookingListData = function () {
        return $http.get('/api/BookingGuest/GetBookList');
    }

    this.getServiceData = function () {
        return $http.get('/api/BookingGuest/getService');
    }

    this.getFilteredGuestData = function (BookingId) { //get guest list using booking id
        return $http.get('/api/BookingGuest/GetGuest', { params: { BookId: BookingId }});
    }


    //Services List
    this.getServiceListData = function () {
        return $http.get('/api/ServiceList/GetServiceList');
    }


    this.PostServiceListData = function (data) {
        return $http({
            method: "post",
            url: ('/api/ServiceList/PostServiceList'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }


    this.UpdateServiceListData = function (data) {
        return $http({
            method: "post",
            url: ('/api/ServiceList/UpdateServiceList'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }


    this.DeleteServiceListData = (data) => {
        return $http({
            method: "post",
            url: ('/api/ServiceList/DeleteServiceList'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }






    //employee list
    this.getEmployeeListData = function () {
        return $http.get('/api/Employee/GetEmployee');
    }


    this.PostEmployeeListData = (data) => {
        console.log("data => ", data);
        return $http({
            method: "post",
            url: ('/api/Employee/PostEmployeeData'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }


    this.UpdateEmployeeListData = function (data) {
        return $http({
            method: "post",
            url: ('/api/Employee/UpdateEmployeeList'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }



    this.DeleteEmployeeListData = (data) => {
        return $http({
            method: "post",
            url: ('/api/Employee/DeleteEmployeeList'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }






    //AdditionalServiceList
    this.getServiceList = function () {
        return $http.get('/api/AdditionalService/getAdditionalService');
    }

    this.getHotelBookList = function (hotelBookGid) {
        return $http.get('/api/AdditionalService/hotelBookingid', { params: { datavariable: hotelBookGid } });
    }

    this.getAdditionalServiceListData = function () {
        return $http.get('/api/AdditionalService/getAddititonalServicedata');
    }


    this.postAdditionalServiceListData = (data) => {
        /*console.log("data => ", data);*/
        return $http({
            method: "post",
            url: ('/api/AdditionalService/postAdditionalService'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    };


    this.updateAdditionalServiceListData = (data) => {
        /*console.log("data => ", data);*/
        return $http({
            method: "post",
            url: ('/api/AdditionalService/updateAdditionalService'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }

    this.deleteAdditionalServiceListData = (data) => {
        /*console.log("data => ", data);*/
        return $http({
            method: "post",
            url: ('/api/AdditionalService/DeleteAdditionalService'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }





    //roomType

    this.getRoomTypeList = function () {
        return $http.get('/api/roomType/GetRoomType');
    }


    this.postRoomTypeList = function (data) {
        return $http({
            method: "post",
            url: ('/api/roomType/postRoomType'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }

    this.updateRoomTypeList = function (data) {
        return $http({
            method: "post",
            url: ('/api/roomType/updateRoomType'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }

    this.deleteRoomTypeList = function (data) {
        return $http({
            method: "post",
            url: ('/api/roomType/deleteRoomType'),
            data: JSON.stringify(data),
            dataType: "json",
        });
    }




    //manageBooking
  /*  this.getManageBookList = function () {
        return $http.get('/api/manageBooking/GetManageBookdata');
    }*/


    this.getPaymentBookingList = function (hotelPayBookId) {
        return $http.get('/api/manageBooking/GetManageBookdata', { params: { dataBookingId: hotelPayBookId } });
    }






    //allRoom
    this.getAllRoomList = function () {
        return $http.get('/api/allRoom/GetAllRoom');
    }

    
})