-- User, Partner, Admin
CREATE TABLE mysqlSengaaAws.sengaa_user(
user_id INT NOT NULL AUTO_INCREMENT,
user_name VARCHAR(100) NOT NULL,
user_picture VARCHAR(100) NOT NULL,
user_email VARCHAR(100) NOT NULL,
user_createdAt TIMESTAMP,
user_updatedAt TIMESTAMP,
PRIMARY KEY ( user_id )
);

CREATE TABLE mysqlSengaaAws.sengaa_partner(
partner_id INT NOT NULL AUTO_INCREMENT,
partner_name VARCHAR(100) NOT NULL,
partner_description VARCHAR(100) NOT NULL,
partner_url VARCHAR(100) NOT NULL,
partner_logo VARCHAR(100) NOT NULL,
partner_accountManager VARCHAR(100) NOT NULL,
partner_accountManagerEmail VARCHAR(100) NOT NULL,
partner_billingAdress_street VARCHAR(100) NOT NULL,
partner_billingAdress_postalCode VARCHAR(100) NOT NULL,
partner_billingAdress_location VARCHAR(100) NOT NULL,
partner_billingAdress_country VARCHAR(100) NOT NULL,
partner_domicile_street VARCHAR(100) NOT NULL,
partner_domicile_postalCode VARCHAR(100) NOT NULL,
partner_domicile_location VARCHAR(100) NOT NULL,
partner_domicile_country VARCHAR(100) NOT NULL,
partner_createdAt TIMESTAMP,
partner_updatedAt TIMESTAMP,
PRIMARY KEY ( partner_id )
);

CREATE TABLE mysqlSengaaAws.sengaa_admin(
admin_id INT NOT NULL AUTO_INCREMENT,
admin_name VARCHAR(100) NOT NULL,
admin_email VARCHAR(100) NOT NULL,
admin_createdAt TIMESTAMP,
admin_updatedAt TIMESTAMP,
PRIMARY KEY ( admin_id )
);


-- Challenge
CREATE TABLE mysqlSengaaAws.sengaa_challenge(
challenge_id INT NOT NULL AUTO_INCREMENT,
challenge_title VARCHAR(100) NOT NULL,
challenge_description VARCHAR(100) NOT NULL,
challenge_startDate DATE NOT NULL,
challenge_endDate DATE NOT NULL,
challenge_firstAward VARCHAR(100) NOT NULL,   
challenge_secondAward VARCHAR(100) NOT NULL,   
challenge_otherAward VARCHAR(100) NOT NULL, 
challenge_single BOOLEAN NOT NULL default 0,
challenge_team BOOLEAN NOT NULL default 0,
challenge_createdAt TIMESTAMP,
challenge_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( challenge_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON UPDATE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_proposedChallenge(
proposedChallenge_id INT NOT NULL AUTO_INCREMENT,
proposedChallenge_title VARCHAR(100) NOT NULL,
proposedChallenge_description VARCHAR(100) NOT NULL,
proposedChallenge_startDate DATE NOT NULL,
proposedChallenge_endDate DATE NOT NULL,
proposedChallenge_firstAward VARCHAR(100) NOT NULL,   
proposedChallenge_secondAward VARCHAR(100) NOT NULL,   
proposedChallenge_otherAward VARCHAR(100) NOT NULL, 
proposedChallenge_single BOOLEAN NOT NULL default 0,
proposedChallenge_team BOOLEAN NOT NULL default 0,
proposedChallenge_createdAt TIMESTAMP,
proposedChallenge_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( proposedChallenge_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON UPDATE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_inactiveChallenge(
inactiveChallenge_id INT NOT NULL AUTO_INCREMENT,
inactiveChallenge_title VARCHAR(100) NOT NULL,
inactiveChallenge_description VARCHAR(100) NOT NULL,
inactiveChallenge_startDate DATE NOT NULL,
inactiveChallenge_endDate DATE NOT NULL,
inactiveChallenge_firstAward VARCHAR(100) NOT NULL,   
inactiveChallenge_secondAward VARCHAR(100) NOT NULL,   
inactiveChallenge_otherAward VARCHAR(100) NOT NULL, 
inactiveChallenge_single BOOLEAN NOT NULL default 0,
inactiveChallenge_team BOOLEAN NOT NULL default 0,
inactiveChallenge_deactivatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( inactiveChallenge_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON UPDATE CASCADE 
);


-- Deal
CREATE TABLE mysqlSengaaAws.sengaa_deal(
deal_id INT NOT NULL AUTO_INCREMENT,
deal_title VARCHAR(100) NOT NULL,
deal_description VARCHAR(100) NOT NULL,
deal_startDate DATE NOT NULL,
deal_endDate DATE NOT NULL,
deal_url VARCHAR(100) NOT NULL,
deal_picture VARCHAR(100) NOT NULL,
deal_createdAt TIMESTAMP,
deal_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( deal_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON UPDATE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_proposedDeal(
proposedDeal_id INT NOT NULL AUTO_INCREMENT,
proposedDeal_title VARCHAR(100) NOT NULL,
proposedDeal_description VARCHAR(100) NOT NULL,
proposedDeal_startDate DATE NOT NULL,
proposedDeal_endDate DATE NOT NULL,
proposedDeal_url VARCHAR(100) NOT NULL,
proposedDeal_picture VARCHAR(100) NOT NULL,
proposedDeal_createdAt TIMESTAMP,
proposedDeal_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( proposedDeal_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON UPDATE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_inactiveDeal(
inactiveDeal_id INT NOT NULL AUTO_INCREMENT,
inactiveDeal_title VARCHAR(100) NOT NULL,
inactiveDeal_description VARCHAR(100) NOT NULL,
inactiveDeal_startDate DATE NOT NULL,
inactiveDeal_endDate DATE NOT NULL,
inactiveDeal_url VARCHAR(100) NOT NULL,
inactiveDeal_picture VARCHAR(100) NOT NULL,
inactiveDeal_deactivatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( inactiveDeal_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON UPDATE CASCADE 
);


-- Event
CREATE TABLE mysqlSengaaAws.sengaa_event(
event_id INT NOT NULL AUTO_INCREMENT,
event_title VARCHAR(100) NOT NULL,
event_description VARCHAR(100) NOT NULL,
event_startDate DATE NOT NULL,
event_endDate DATE NOT NULL,
event_picture VARCHAR(100) NOT NULL,
event_createdAt TIMESTAMP,
event_updatedAt TIMESTAMP,
PRIMARY KEY ( event_id )
);

CREATE TABLE mysqlSengaaAws.sengaa_inactiveEvent(
inactiveEvent_id INT NOT NULL AUTO_INCREMENT,
inactiveEvent_title VARCHAR(100) NOT NULL,
inactiveEvent_description VARCHAR(100) NOT NULL,
inactiveEvent_startDate DATE NOT NULL,
inactiveEvent_endDate DATE NOT NULL,
inactiveEvent_picture VARCHAR(100) NOT NULL,
inactiveEvent_deactivatedAt TIMESTAMP,
PRIMARY KEY ( inactiveEvent_id )
);


-- Style
CREATE TABLE mysqlSengaaAws.sengaa_style(
style_id INT NOT NULL AUTO_INCREMENT,
style_title VARCHAR(100) NOT NULL,
style_picture VARCHAR(100) NOT NULL,
style_countWows INT DEFAULT 0,
style_createdAt TIMESTAMP,
style_updatedAt TIMESTAMP,
user_id INT NOT NULL,
challenge_id INT NOT NULL,
PRIMARY KEY ( style_id ),
FOREIGN KEY ( user_id )
REFERENCES sengaa_user( user_id )
ON UPDATE CASCADE ,
FOREIGN KEY ( challenge_id )
REFERENCES sengaa_challenge( challenge_id )
ON UPDATE CASCADE
);