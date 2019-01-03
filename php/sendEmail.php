<?php
	//Collecting Basic Information
	$name = $_POST['contactName'];
	$email = $_POST['contactEmail'];
	$subject= $_POST['contactSubject'];
	$message= $_POST['contactMessage'];

	//The Form Content
	$formContent = " From: $name \n E-Mail: $email \n Subject: $subject \n Message: $message";

	//Who is this going to
	$recipient = "example@example.com";

	//Mail Subject
	$mailHeader = "A Message From $name \r\n";
	mail($recipient, $subject, $formContent, $mailHeader) or die ("Oh snap! Seems like something went wrong. Give it another shot.");

	//Message Sent Notice
	echo "You handsome beast you...I got your mail. Give me a few days to sort things through and I'll shoot you a reply.";
?>
