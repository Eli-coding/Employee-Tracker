USE employee_tracker_db;

INSERT INTO department (name)
VALUES 
( "Sales"), ("HR"), ("Marketing"), ("IT");

INSERT INTO role (title, salary, department_id) 
VALUES
("saleslead" ,120000, 1),
("HR Associate", 120000, 2),
('CFO', 120000, 3);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES 
("Anna", "Swift", 1 , null),
("Eric", "Jones", 2 , 1),
("Eliza", "Hamilton", 3, 1);

