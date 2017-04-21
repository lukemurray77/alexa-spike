#ec2 set up

1. security setup
    - security group name = mongodb-sec-group
    - descritpion = mongo-db-sec created ...
    - SSH - set ip address rule 'IPADDRESS'/32
    - create a new key pair
        - name: mongodb-key-pair
        - download key-pair which is a certificate file

2. LAUNCH INSTANCE

3. Install mongo db and setup server internet access
    - google ssh into linux server
    - CLI - unprotective private key file, perssions are too open
    - CLI - chmod 600 ~/Desktop/mongodb-key-pair.pem => file path to downloaded key-pair certificate
    - CLI  -  ssh -i ~/Desktop/mongodb-key-pair.pem ec2-user@ec2-107-21-3-232.compute-1.amazonaws.com
        - 1st we had no user, then we tried with @ROOT, then with ec2-user
    - once in, 'harden linux server' - google search and do the basics
        1. update linux - $ yum list updates => listed updates
        2. update linux - $ sudo yum update => installed updates with yes
        3. PERFORM OTHER HARDEN STEPS
    - CLI - install mongodb on linux server (google for guide) https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-amazon/
        1. 



#default secruity group for lambda functions


ec2 user info

    id - AKIAIXKKPW3VRRPUXE6A
   access key - 0TkP2xAwoo40sHG1saqkM0qYihfDXxpzS0On/2Uo
   User ARN - arn:aws:iam::231948961758:user/EC2-mongodb