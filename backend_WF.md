## Guest

---
<!-- 
	check if user is authenticated (has cookie).
	if not then go to next 
-->
<pre>
validate if req.session.userId
	- true => return res.status(400).json({message:"User already logged"})
  	- false => next()

</pre>

<!-- ---------------------------------------------- -->



## isLoggedIn
 
 ---

<!-- check if user req.body.userId-->

<pre>
validate if req.session.userId
	- false => return res.status(403).json({message:"User not authorized"})
  	- true => next()

</pre>


<!-- ---------------------------------------------- -->



## Register

---

<!-- 
check if user is already authenticated ( has a cookie )
if not try to encrypt pass and insert in database
-->
<pre>

 validate req.body 
     - false => req.status(400).json({message:"Invalid request data received"})
     - true =>  encrypt req.body.pass
           	- false => res.status(500). ({message :"server error"})
         	- true => insert user(email and hash pass in db)
               		- false res.status(500). ({message : "Error saving user"})
               		- true res.status(203).({message: "User was succesfully created"})
</pre>

<!-- ---------------------------------------------- -->



##  Login

---
<pre>  	
find user(email) in database
   	- false=> res.401({message:"User authentication failed})
   	- true => compare req.body.pass with database password 
       	- false => res.401({message:"User authentication failed})
       	- true => generate req.session.userId
			- false =>(res.500 ({message: "Server error"})
    		-  true => res.200.status ({message: "User autehnticated})

</pre>


<!-- ---------------------------------------------- -->



## View Posts

<pre>
select * posts from database
	-false => res.status(500).json({message:"server error})
	-true =>res.status(200).json({posts})
</pre>


<!-- ---------------------------------------------- -->


## Create Post

<pre>
validate req.body
	-false => res.status(500).json({message:"server error})
	-true =>res.status(200).json({posts})
</pre>



