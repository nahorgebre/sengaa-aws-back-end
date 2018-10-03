-- User, Partner, Admin
CREATE TABLE mysqlSengaaAws.sengaa_user(
user_id INT NOT NULL AUTO_INCREMENT,
user_name VARCHAR(100),
user_picture VARCHAR(100),
user_email VARCHAR(100) NOT NULL,
user_createdAt TIMESTAMP,
user_updatedAt TIMESTAMP,
PRIMARY KEY ( user_id )
);

CREATE TABLE mysqlSengaaAws.sengaa_partner(
partner_id INT NOT NULL AUTO_INCREMENT,
partner_name VARCHAR(100),
partner_description VARCHAR(100),
partner_url VARCHAR(100),
partner_logo VARCHAR(100),
partner_accountManager VARCHAR(100),
partner_accountManagerEmail VARCHAR(100) NOT NULL,
partner_billingAdress_street VARCHAR(100),
partner_billingAdress_postalCode VARCHAR(100),
partner_billingAdress_location VARCHAR(100),
partner_billingAdress_country VARCHAR(100),
partner_domicile_street VARCHAR(100),
partner_domicile_postalCode VARCHAR(100),
partner_domicile_location VARCHAR(100),
partner_domicile_country VARCHAR(100),
partner_createdAt TIMESTAMP,
partner_updatedAt TIMESTAMP,
PRIMARY KEY ( partner_id )
);

CREATE TABLE mysqlSengaaAws.sengaa_admin(
admin_id INT NOT NULL AUTO_INCREMENT,
admin_name VARCHAR(100),
admin_email VARCHAR(100) NOT NULL,
admin_createdAt TIMESTAMP,
admin_updatedAt TIMESTAMP,
PRIMARY KEY ( admin_id )
);


-- Challenge
CREATE TABLE mysqlSengaaAws.sengaa_challenge(
challenge_id INT NOT NULL AUTO_INCREMENT,
challenge_title VARCHAR(100),
challenge_description VARCHAR(100),
challenge_startDate DATE,
challenge_endDate DATE,
challenge_firstAward VARCHAR(100),   
challenge_secondAward VARCHAR(100),   
challenge_otherAward VARCHAR(100), 
challenge_single BOOLEAN NOT NULL default 0,
challenge_team BOOLEAN NOT NULL default 0,
challenge_createdAt TIMESTAMP,
challenge_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( challenge_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON DELETE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_proposedChallenge(
proposedChallenge_id INT NOT NULL AUTO_INCREMENT,
proposedChallenge_title VARCHAR(100),
proposedChallenge_description VARCHAR(100),
proposedChallenge_startDate DATE,
proposedChallenge_endDate DATE,
proposedChallenge_firstAward VARCHAR(100),   
proposedChallenge_secondAward VARCHAR(100),   
proposedChallenge_otherAward VARCHAR(100), 
proposedChallenge_single BOOLEAN default 0,
proposedChallenge_team BOOLEAN default 0,
proposedChallenge_createdAt TIMESTAMP,
proposedChallenge_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( proposedChallenge_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON DELETE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_inactiveChallenge(
inactiveChallenge_id INT NOT NULL AUTO_INCREMENT,
inactiveChallenge_title VARCHAR(100),
inactiveChallenge_description VARCHAR(100),
inactiveChallenge_startDate DATE,
inactiveChallenge_endDate DATE,
inactiveChallenge_firstAward VARCHAR(100),   
inactiveChallenge_secondAward VARCHAR(100),   
inactiveChallenge_otherAward VARCHAR(100), 
inactiveChallenge_single BOOLEAN NOT NULL default 0,
inactiveChallenge_team BOOLEAN NOT NULL default 0,
inactiveChallenge_deactivatedAt TIMESTAMP,
inactiveChallenge_deactivationReason_Expired BOOLEAN NOT NULL default 0,
inactiveChallenge_deactivationReason_Deleted BOOLEAN NOT NULL default 0,
partner_id INT NOT NULL,
PRIMARY KEY ( inactiveChallenge_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON DELETE CASCADE 
);


-- Deal
CREATE TABLE mysqlSengaaAws.sengaa_deal(
deal_id INT NOT NULL AUTO_INCREMENT,
deal_title VARCHAR(100),
deal_description VARCHAR(100),
deal_startDate DATE,
deal_endDate DATE,
deal_url VARCHAR(100),
deal_picture VARCHAR(100),
deal_createdAt TIMESTAMP,
deal_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( deal_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON DELETE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_proposedDeal(
proposedDeal_id INT NOT NULL AUTO_INCREMENT,
proposedDeal_title VARCHAR(100),
proposedDeal_description VARCHAR(100),
proposedDeal_startDate DATE,
proposedDeal_endDate DATE,
proposedDeal_url VARCHAR(100),
proposedDeal_picture VARCHAR(100),
proposedDeal_createdAt TIMESTAMP,
proposedDeal_updatedAt TIMESTAMP,
partner_id INT NOT NULL,
PRIMARY KEY ( proposedDeal_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON DELETE CASCADE 
);

CREATE TABLE mysqlSengaaAws.sengaa_inactiveDeal(
inactiveDeal_id INT NOT NULL AUTO_INCREMENT,
inactiveDeal_title VARCHAR(100),
inactiveDeal_description VARCHAR(100),
inactiveDeal_startDate DATE,
inactiveDeal_endDate DATE,
inactiveDeal_url VARCHAR(100),
inactiveDeal_picture VARCHAR(100),
inactiveDeal_deactivatedAt TIMESTAMP,
inactiveDeal_deactivationReason_Expired BOOLEAN NOT NULL default 0,
inactiveDeal_deactivationReason_Deleted BOOLEAN NOT NULL default 0,
partner_id INT NOT NULL,
PRIMARY KEY ( inactiveDeal_id ),
FOREIGN KEY ( partner_id )
REFERENCES sengaa_partner( partner_id )
ON DELETE CASCADE 
);


-- Event
CREATE TABLE mysqlSengaaAws.sengaa_event(
event_id INT NOT NULL AUTO_INCREMENT,
event_title VARCHAR(100),
event_description VARCHAR(100),
event_startDate DATE,
event_endDate DATE,
event_picture VARCHAR(100),
event_createdAt TIMESTAMP,
event_updatedAt TIMESTAMP,
PRIMARY KEY ( event_id )
);

CREATE TABLE mysqlSengaaAws.sengaa_inactiveEvent(
inactiveEvent_id INT NOT NULL AUTO_INCREMENT,
inactiveEvent_title VARCHAR(100),
inactiveEvent_description VARCHAR(100),
inactiveEvent_startDate DATE,
inactiveEvent_endDate DATE,
inactiveEvent_picture VARCHAR(100),
inactiveEvent_deactivatedAt TIMESTAMP,
inactiveEvent_deactivationReason_Expired BOOLEAN NOT NULL default 0,
inactiveEvent_deactivationReason_Deleted BOOLEAN NOT NULL default 0,
PRIMARY KEY ( inactiveEvent_id )
);


-- Style
CREATE TABLE mysqlSengaaAws.sengaa_style(
style_id INT NOT NULL AUTO_INCREMENT,
style_title VARCHAR(100),
style_picture VARCHAR(100),
style_countWows INT DEFAULT 0,
style_createdAt TIMESTAMP,
style_updatedAt TIMESTAMP,
user_id INT NOT NULL,
challenge_id INT NOT NULL,
PRIMARY KEY ( style_id ),
FOREIGN KEY ( user_id )
REFERENCES sengaa_user( user_id )
ON DELETE CASCADE ,
FOREIGN KEY ( challenge_id )
REFERENCES sengaa_challenge( challenge_id )
ON DELETE CASCADE
);