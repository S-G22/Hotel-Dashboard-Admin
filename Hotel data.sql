INSERT INTO Guests (EmployeeID, GuestName, Email, AddressDetail, StateName, AadhaarNumber, MobileNumber) 
VALUES
    (21, 'John Doe', 'john@example.com', '123 Main Street', 'California', 123456, 555123456),
    (2, 'Jane Smith', 'jane@example.com', '456 Oak Avenue', 'New York', 234567, 555234567),
    (3, 'Mike Johnson', 'mike@example.com', '789 Elm Street', 'Texas', 345678, 555345678),
    (4, 'Emily Brown', 'emily@example.com', '987 Pine Road', 'Florida', 456789, 555456790),
    (5, 'Michael Lee', 'michael@example.com', '321 Elm Street', 'California', 567890, 555678901),
    (6, 'Sarah Wilson', 'sarah@example.com', '654 Oak Avenue', 'New York', 678901, 556789012),
    (7, 'David Clark', 'david@example.com', '876 Main Street', 'Texas', 789012, 555790123),
    (8, 'Emma Martinez', 'emma@example.com', '543 Pine Road', 'Florida', 890123, 558901234),
    (9, 'Daniel Taylor', 'daniel@example.com', '210 Oak Avenue', 'California', 901234, 555912345),
    (10, 'Olivia Walker', 'olivia@example.com', '123 Elm Street', 'New York', 123345, 555123456),
    (11, 'James White', 'james@example.com', '456 Main Street', 'Texas', 234456, 555234456),
    (12, 'Ava Anderson', 'ava@example.com', '789 Oak Avenue', 'Florida', 345567, 555345568),
    (13, 'Matthew Garcia', 'matthew@example.com', '987 Pine Road', 'California', 456678, 554566789),
    (14, 'Sophia Martinez', 'sophia@example.com', '654 Elm Street', 'New York', 567789, 555677890),
    (15, 'Isabella Hernandez', 'isabella@example.com', '321 Main Street', 'Texas', 678890, 555788901),
    (16, 'Logan Gonzalez', 'logan@example.com', '876 Oak Avenue', 'Florida', 789901, 555789902),
    (17, 'Alexander Wilson', 'alexander@example.com', '543 Pine Road', 'California', 890012, 558900123),
    (18, 'Elijah Martinez', 'elijah@example.com', '210 Elm Street', 'New York', 901123, 555901234),
    (19, 'Mia Taylor', 'mia@example.com', '123 Main Street', 'Texas', 123234, 555123235),
    (20, 'Charlotte Brown', 'charlotte@example.com', '456 Oak Avenue', 'Florida', 234345, 555243456);



INSERT INTO Employee (EmployeeID, Email, Passwords, AadhaarNumber, JobRole, MobileNumber) VALUES
('John Smith', 'john@example.com', 'password1', 12345678, 'Front Desk Receptionist', 555123459),
('Emily Johnson', 'emily@example.com', 'password2', 23456789, 'Housekeeping Staff', 555234567),
('Michael Williams', 'michael@example.com', 'password3', 34567890, 'Restaurant Server', 555345678),
('Sarah Brown', 'sarah@example.com', 'password4', 45678901, 'Chef', 555456789),
('Daniel Garcia', 'daniel@example.com', 'password5', 56789012, 'Bellhop', 555567890),
('Olivia Martinez', 'olivia@example.com', 'password6', 67890123, 'Concierge', 555678901),
('William Rodriguez', 'william@example.com', 'password7', 78901234, 'Security Guard', 555789012),
('Sophia Hernandez', 'sophia@example.com', 'password8', 89012345, 'Room Service Attendant', 555890123),
('James Smith', 'james@example.com', 'password9', 90123456, 'Housekeeping Supervisor', 555901234),
('Emma Johnson', 'emma@example.com', 'password10', 1234567, 'Front Office Manager', 555123456),
('Alexander Brown', 'alexander@example.com', 'password11', 2345678, 'Food and Beverage Manager', 555234567),
('Charlotte Garcia', 'charlotte@example.com', 'password12', 3456789, 'Executive Chef', 555345678),
('Benjamin Martinez', 'benjamin@example.com', 'password13', 4567890, 'Hotel Manager', 555456789),
('Amelia Rodriguez', 'amelia@example.com', 'password14', 5678901, 'Assistant Hotel Manager', 555678901),
('Michael Smith', 'michael.smith@example.com', 'password15', 6789012, 'Maintenance Staff', 556789012),
('Sophia Johnson', 'sophia.johnson@example.com', 'password16', 7890123, 'Valet Parking Attendant', 555790123),
('James Brown', 'james.brown@example.com', 'password17', 8901234, 'Security Supervisor', 555890124),
('Olivia Garcia', 'olivia.garcia@example.com', 'password18', 9012345, 'Event Coordinator', 555902345),
('Charlotte Rodriguez', 'charlotte.rodriguez@example.com', 'password19', 123456, 'Banquet Manager', 555134567),
('Benjamin Smith', 'benjamin.smith@example.com', 'password20', 234567, 'Housekeeping Manager', 555234568);




INSERT INTO RoomType (RoomTypeName, BaseRate, MaxOccupancy, Descriptions) 
VALUES
    ('Single Room', 50.00, 1, 'A cozy room for solo travelers'),
    ('Double Room', 80.00, 2, 'A comfortable room for two guests'),
    ('Twin Room', 80.00, 2, 'A room with two separate beds'),
    ('Triple Room', 110.00, 3, 'A room suitable for three occupants'),
    ('Quad Room', 130.00, 4, 'A spacious room for four people'),
    ('Suite', 200.00, 2, 'An elegant suite for luxury stays'),
    ('Family Room', 150.00, 4, 'A room designed for families'),
    ('King Room', 120.00, 2, 'A room with a king-sized bed'),
    ('Deluxe Room', 180.00, 2, 'A luxurious room with premium amenities'),
    ('Standard Room', 70.00, 2, 'A standard room for general accommodation'),
    ('Executive Room', 160.00, 2, 'A room tailored for executive travelers');

UPDATE RoomType
SET BaseRate = 
    CASE 
        WHEN RoomTypeName IN ('Single Room', 'Double Room', 'Triple Room') THEN BaseRate + 1000
        WHEN RoomTypeName = 'Quad Room' THEN BaseRate + 1500
        WHEN RoomTypeName IN ('Suite', 'Family Room') THEN BaseRate + 2000
        WHEN RoomTypeName = 'King Room' THEN BaseRate + 2500
        WHEN RoomTypeName = 'Deluxe Room' THEN BaseRate + 3500
        WHEN RoomTypeName = 'Standard Room' THEN BaseRate + 4000
        WHEN RoomTypeName = 'Executive Room' THEN BaseRate + 8000
        ELSE BaseRate  -- Keep the current value for all other room types
    END;

Update RoomType Set BaseRate= + 1200 where RoomTypeName= 'Twin Room';






INSERT INTO Room (RoomTypeID, RoomNumber, FloorNumber)
VALUES
-- Floors 1-5 with RoomTypeID 1-5
    (1, '101', 1), (2, '102', 1), (3, '103', 1), (4, '104', 1), (5, '105', 1),
    (1, '106', 1), (2, '107', 1), (3, '108', 1), (4, '109', 1), (5, '110', 1),
    (1, '111', 2), (2, '112', 2), (3, '113', 2), (4, '114', 2), (5, '115', 2),
    (1, '116', 2), (2, '117', 2), (3, '118', 2), (4, '119', 2), (5, '120', 2),
    (1, '201', 3), (2, '202', 3), (3, '203', 3), (4, '204', 3), (5, '205', 3),
    (1, '206', 3), (2, '207', 3), (3, '208', 3), (4, '209', 3), (5, '210', 3),
    (1, '301', 4), (2, '302', 4), (3, '303', 4), (4, '304', 4), (5, '305', 4),
    (1, '306', 4), (2, '307', 4), (3, '308', 4), (4, '309', 4), (5, '310', 4),
    (1, '401', 5), (2, '402', 5), (3, '403', 5), (4, '404', 5), (5, '405', 5),
    (1, '406', 5), (2, '407', 5), (3, '408', 5), (4, '409', 5), (5, '410', 5),
-- Floors 6-9 with RoomTypeID 6, 7, 8, 9, 10
    (6, '601', 6), (7, '602', 6), (8, '603', 6), (9, '604', 6), (10, '605', 6),
    (6, '606', 6), (7, '607', 6), (8, '608', 6), (9, '609', 6), (10, '610', 6),
    (6, '701', 7), (7, '702', 7), (8, '703', 7), (9, '704', 7), (10, '705', 7),
    (6, '706', 7), (7, '707', 7), (8, '708', 7), (11, '709', 7), (10, '710', 7),
    (6, '801', 8), (7, '802', 8), (8, '803', 8), (9, '804', 8), (10, '805', 8),
    (6, '806', 8), (7, '807', 8), (8, '808', 8), (11, '809', 8), (10, '810', 8),
    (6, '901', 9), (7, '902', 9), (8, '903', 9), (9, '904', 9), (10, '905', 9),
    (6, '906', 9), (7, '907', 9), (8, '908', 9), (11, '909', 9), (10, '910', 9);



  
  

INSERT INTO ServiceList (ServicesName, Descriptions, Price)
VALUES
    ('Concierge Service', 'Personalized assistance for guests, including reservations, transportation, and recommendations.', 800),
    ('Spa Treatment', 'Indulge in luxurious spa treatments for relaxation and rejuvenation.', 1200),
    ('Private Dining', 'Exclusive dining experience in a private setting, with personalized menus and service.', 3500),
    ('Chauffeur Service', 'Luxurious chauffeur-driven transportation for guests.', 3000),
    ('Butler Service', 'Dedicated butler available to cater to guests needs and preferences.', 1500),
    ('Gourmet Breakfast', 'Sumptuous gourmet breakfast options served in-room or at the hotel restaurant.', 900),
    ('Limousine Service', 'Arrive in style with chauffeur-driven luxury limousine service.', 4000),
    ('Culinary Masterclass', 'Exclusive cooking classes led by renowned chefs for a hands-on culinary experience.', 5000),
    ('VIP Airport Transfer', 'Luxurious and hassle-free transfer from/to the airport with VIP treatment.', 5000);





INSERT INTO Booking(EmployeeID, TotalBill)
VALUES
    (2,1050),
    (2,1080),
    (2,4070),
    (15,1110),
    (15,1630),
    (2,2200),
    (2,8160),
    (2,2620),
    (14,3680),
    (2,4070),
    (2,8160),
    (2,2200),
    (15,2620),
    (15,1630),
    (2,1050);




INSERT INTO BookingGuest(BookingID, GuestID, RoomID, EmployeeID)
VALUES
    (1, 10, 20, 2),
    (2, 11, 12, 2),
    (3, 8, 23, 2),
    (4, 7, 84, 2),
    (5, 23, 5,2),
    (5, 12, 5, 2),
    (5, 25, 5,2),
    (5, 26, 5, 2),
    (6, 9, 68,2),
    (6, 12, 68, 2),
    (10, 24, 73, 2),
    (12, 22, 66, 2),
    (13, 13, 81,2),
    (14, 14, 22,2),
    (15, 15, 39, 15),
    (15, 15, 39,2),
    (7, 17, 56,2),
    (8, 8, 8,2),
    (9, 20, 79,2),
    (11, 26, 21, 2);






INSERT INTO AdditionalBookingDetails (BookingGuestId, ServiceID, Quantity, TotalBill)
VALUES
    (150, 1, 2, 1600.00),  -- Concierge Service
    (151, 2, 1, 1200.00),  -- Spa Treatment
    (152, 3, 1, 3500.00),  -- Private Dining
    (153, 4, 1, 3000.00),  -- Chauffeur Service
    (154, 5, 3, 4500.00),  -- Butler Service
    (155, 6, 2, 1800.00),  -- Gourmet Breakfast
    (157, 7, 1, 4000.00),  -- Limousine Service
    (158, 8, 1, 5000.00),  -- Culinary Masterclass
    (159, 9, 2, 10000.00), -- VIP Airport Transfer
    (160, 2, 1, 1200.00),  -- Spa Treatment
	(161, 4, 1, 3000.00),  -- Chauffeur Service
	(162, 6, 2, 1800.00),  -- Gourmet Breakfast
	(163, 9, 2, 10000.00), -- VIP Airport Transfer
	(166, 1, 2, 1600.00),  -- Concierge Service
	(167, 2, 1, 1200.00);  

	insert into Employee ( EmployeeName, Email, Passwords, AadhaarNumber, JobRole, MobileNumber)
	values 
	('Admin', 'admin01@gmail.com', 'adminpass1', 1896790765, 'Admin', 928967567),
	( 'SuperAdmin', 'superadmin01@gmail.com', 'superadminpass1', 1896790, 'SuperAdmin', 928967567);
	      
