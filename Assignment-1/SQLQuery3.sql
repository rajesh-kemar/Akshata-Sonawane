
CREATE TABLE Drivers (DriverID INT PRIMARY KEY,DName VARCHAR(25) NOT NULL,LicenseNumber VARCHAR(25) UNIQUE NOT NULL,Phone BIGINT,ExperienceYear INT);


INSERT INTO Drivers VALUES (101, 'Rahul Sharma', '2001MH', 1235637882, 3),
                          (102, 'Anuj Tupe', '20341MP', 7074900034, 2),
                          (103, 'Shubham Mane', '2024MH', 9923444050, 7),
                          (104, 'Shiv Gupta', '200MH', 9034562999, 5),
                          (105, 'Amit Puri', '20034UP', 4433291011, 4);

SELECT * FROM Drivers;


CREATE TABLE Vehicles (vehicleID INT PRIMARY KEY NOT NULL,NumberPlate VARCHAR(50) UNIQUE NOT NULL,VType VARCHAR(25),Capacity DECIMAL(10,2),VStatus VARCHAR(25));

INSERT INTO Vehicles VALUES (201, 'MH2340', 'Truck', 12.5, 'Ongoing'),
                            (202, 'MP2366', 'Mini Truck', 8.0, 'In Use'),
                            (203, 'MH2200', 'Pickup', 5.0, 'Available'),
                            (204, 'MH9940', 'Truck', 10.0, 'In Use'),
                            (205, 'UP2340', 'Pickup', 6.4, 'Ongoing');


SELECT * FROM Vehicles;


CREATE TABLE Trips (TripID INT PRIMARY KEY,vehicleID INT,DriverID INT,TSource VARCHAR(25) null,TDestination VARCHAR(25) null,StartTime DATETIME,EndTime DATETIME,TripStatus VARCHAR(25),
    FOREIGN KEY (vehicleID) REFERENCES Vehicles(vehicleID),
    FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID)
);

INSERT INTO Trips VALUES (1, 201, 101, 'Mumbai', 'Pune', '2025-10-10 08:00:00', '2025-11-22 10:00:00', 'Completed'),
                         (2, 202, 102, 'Latur', 'Pune', '2025-07-10 09:30:00', '2025-11-22 11:00:00', 'Completed'),
                         (3, 203, 101, 'Nashik', 'Beed', '2025-09-10 04:15:00', '2025-10-12 06:40:00', 'Ongoing'),
                         (4, 204, 101, 'Nagpur', 'Amravati', '2025-07-14 12:00:00', '2025-07-30 03:00:00', 'Completed'),
                         (5, 205, 105, 'Keral', 'Mumbai', '2025-11-22 09:00:00', '2025-12-02 10:00:00', 'Ongoing');

SELECT * FROM Trips;

TRUNCATE TABLE Trips;

/**************************************************************************************************************************************/

SELECT 
d.DriverID,d.DName AS DriversName,
t.TripID,t.TSource,t.TDestination,t.StartTime,t.EndTime,t.TripStatus
FROM Drivers d
join Trips t ON d.DriverID=t.DriverID;

/****************************************************************************************************************************************/

SELECT v.vehicleID ,v.NumberPlate ,v.VType,v.Capacity,v.VStatus
FROM Vehicles v
LEFT JOIN Trips t ON v.vehicleID=t.vehicleID
WHERE t.vehicleID is null;

/****************************************************************************************************************************************/

SELECT d.DriverID,d.DName,
COUNT(t.TripID) AS TotalTrips
FROM Drivers d
join Trips t ON d.DriverID=t.DriverID
Group BY d.DriverID,d.DName
HAVING COUNT(t.TripID)>2;

/****************************************************************************************************************************************/

