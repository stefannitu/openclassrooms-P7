## check user is logged

get storageitem is logged
	- true => show components  create post and list post
	- false => show login

## login component
<pre>
 validate form fields with zod
    - false => ask user to check fields
    - true => send data to API and wait for response (
         - res.200.status ({message: "User autehnticated})) => context isLoggedIn = 1 , set storage =1 , show create post and list post
         - (...) => show error message
</pre>


## register component

<pre>
valdiate fields with zod
	- false => ask user to check fields
    - true => send data to API and wait for response
        -res.status(203).({message: "User saved"}) ,isLoggedIn = 1 , set storage =1 , show create post and list post
        -  (...) => show error message

</pre>


## Create post component

<pre>
validate fields with zod
	- false => ask user to check fields
    - true => send data to API and wait for response
        - res.status(500).json({server error}) => show server error
        -  res.status(200).json({"Post saved"}) => refresh list posts component
</pre>


## List posts component

<pre>

	fetch all post from database
		-res.status(500).json({message:"server error}) => show error
		-true =>res.status(200).json({posts})

</pre>
  		