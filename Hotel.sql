Create Database HOTEL;
use HOTEL;

Create Table EmployeeDetail (
EmployeeID int identity(1,1) not null primary key,
EmployeeName varchar(400), 
Email nvarchar(450) UNIQUE,
Passwords nvarchar(300) NOT NULL Unique,
AadhaarNumber int NOT NULL Unique,
JobRole varchar(400),
MobileNumber int
);

EXEC sp_rename 'EmployeeDetail', 'Employee';  

Create Table Guests (
GuestID int identity(1,1) not null primary key,
EmployeeID int,
Constraint EmployeeId FOREIGN KEY (EmployeeID) REFERENCES EmployeeDetail(EmployeeID),
GuestName varchar(400), 
Email nvarchar(450) UNIQUE,
AddressDetail nvarchar(500),
StateName varchar(400),
AadhaarNumber int NOT NULL Unique,
MobileNumber int,
);

Create Table RoomType(
RoomTypeID int identity(1,1) not null primary key,
RoomTypeName varchar(400), 
BaseRate int,
MaxOccupancy int,
Descriptions varchar(500)
);

Create Table Room(
RoomID int identity(1,1) not null primary key,
RoomTypeID int,
Constraint RoomTypeID Foreign Key (RoomTypeID) References RoomType(RoomTypeID),
RoomNumber int , 
FloorNumber int,
);


Create Table BookingDetail (
BookingID int identity(1,1) not null primary key,
EmployeeID int,
Constraint EmpID FOREIGN KEY (EmployeeID) REFERENCES EmployeeDetail(EmployeeID),
TotalBill decimal
);

EXEC sp_rename 'BookingDetail', 'Booking';  
ALTER TABLE Booking
DROP COLUMN TotalBill;
ALTER TABLE Booking
ADD CheckIn datetime;
ALTER TABLE Booking
ADD CheckOut datetime;
ALTER TABLE Booking
DROP COLUMN CheckIn;
ALTER TABLE Booking
ADD Num_Of_Guest int;
ALTER TABLE Booking
ADD Mode_Of_Payment varchar(80);





Create table BookingGuest(
BookingGuestID int identity(1,1) not null primary key,
BookingID int,
Constraint BookID FOREIGN KEY (BookingID) REFERENCES BookingDetail(BookingID),
GuestID int,
Constraint GuestID FOREIGN KEY (GuestID) REFERENCES Guests(GuestID),
RoomID int,
Constraint RoomID FOREIGN KEY (RoomID) REFERENCES Room(RoomID),
CheckIN datetime,
CheckOUT datetime,
EmployeeID int,
Constraint CheckInEmployeeID FOREIGN KEY (EmployeeID) REFERENCES EmployeeDetail(EmployeeID),
Constraint CheckOutEmployeeID FOREIGN KEY (EmployeeID) REFERENCES EmployeeDetail(EmployeeID),
);

ALTER TABLE BookingGuest
DROP COLUMN CheckIN;
ALTER TABLE BookingGuest
DROP COLUMN CheckOUT;

Create Table ServiceList(
ServiceID int identity(1,1) not null primary key,
ServicesName varchar (200),
Descriptions varchar(300),
Price int
);

Create Table AdditionalBookingDetails(
AdditionalBookingDetailsID int identity(1,1) not null primary key,
BookingGuestId int,
Constraint BookingGuestID FOREIGN KEY (BookingGuestID) REFERENCES BookingGuest(BookingGuestID),
ServiceID int,
Constraint ServiceID FOREIGN KEY (ServiceID) REFERENCES ServiceList(ServiceID),
Quantity Int,
TotalBill Decimal
);
alter table AdditionalBookingDetails
add GuestID int ;

create table Payment (
PaymentID int identity(1,1) not null primary key,
BookingId int,
Constraint BookingId Foreign Key (BookingId) references Booking(BookingId),
Payment_Date date,
Amount decimal,
Payment_Method nvarchar(100)
);

EXEC sp_rename 'Payment.Amount', 'TotalAmount', 'COLUMN';
alter table Payment add paidAmount MONEY;
ALTER TABLE Payment add PaymentCreatedAt datetime;
Alter table Payment add PaymentUpdatedAt datetime;
alter table Payment drop column Payment_Method;

create table Props (
PropID int identity(1,1) not null primary key,
Names varchar(50),
Age int );

alter table Props add ID int;


create table Invoice (
InvoiceID int identity (1,1) not null primary key,
BookingId int,
constraint FK_InvoiceBooking Foreign Key (BookingId) references Booking(BookingId),
InvoiceNumber nvarchar(100),
InvoiceDate date,
TotalAmount Money,
Discount int,
NetAmount decimal);


create table InvoiceDetail (
InvoiceDetailId int identity (1,1) not null primary key,
InvoiceID int,
constraint invoiceID Foreign key (InvoiceID) references Invoice(InvoiceID),
ServiceID int,
constraint FK_ServiceID Foreign Key (ServiceID) references ServiceList (ServiceID),
RoomID int,
constraint roomID Foreign Key (RoomID) references Room(RoomID),
HSN_SAC_Code int,
Line_Total money,
GST_Number varchar(50),
SGST int,
CGST int,
IGST int );