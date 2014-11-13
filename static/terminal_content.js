function hello(terminal){
	var instruction2function={"help": help, "login": login, "reset password": reset_password}
	terminal.print("ALL HAIL BIGDOG! Welcome to Python Notebook Server :)");
	terminal.input("What Can I do for you? [help for list of instructions]> ", function(instruction){
		var func = instruction2function[instruction];
		if (func) {
			func(terminal);
		}else{
			terminal.print("No instruction found, please try it again");
			hello(terminal);
		}
	});
}

function reset_password(terminal){
	terminal.input("Your username:", function(username){
		terminal.password("Your password:", function(password){
			terminal.password("Your new password:", function(new_password){
				terminal.password("enter it again:", function(repeate_password){
					if (repeate_password!=new_password){
						terminal.print("Sorry, the new password does not match");
						hello(terminal);
					}else{
						var change_password_callback = function(data){
								if (data.status=="success"){
									terminal.print("password changed successfully");
								}else if (data.status=="authentication_faliure"){
									terminal.print("incorrect username or password");
								}else{
									terminal.print("unkown error");
								}
								hello(terminal);
							};
						}
						$.post("/change_password", 
							{"username": username, 
							"password": password, 
							"new_password": new_password}, change_password_callback ,"json");
				});
			});
		});
	});
}

function help(terminal){
	terminal.print("help: to show all the instructions");
	terminal.print("login: to log in to your personal notebook");
	terminal.print("reset password: to reset your password");
	hello(terminal);
}

function login(terminal){
	terminal.input("Your username:", function(username){
		var login_callback = function(data){
				if (!data.name_exist){
					terminal.print("Sorry, there is no name for that user");
					terminal.input("Do you want to try agian?[Y/N]> ", function(answer){
						if (answer=="Y"){
							login(terminal);
						}else{
							hello(terminal);
						}
					});
				}else{
					terminal.print("Successfully connected, please go in with your password");
					console.log(data);
					terminal.sleep(2000, function(){
						window.location = data.url;
					});
				}
			};
		$.post("/login",{"username": username}, login_callback, "json");
	});
}
$(document).ready(function(){
	var myTerminal = terminal();
	myTerminal.setBackgroundColor("#000000");
	myTerminal.setTextColor("#ffffff");
	myTerminal.setWidth("100%");
	myTerminal.setHeight("100%");
	myTerminal.blinkingCursor(true);
	$("body").append(myTerminal.html());
	hello(myTerminal);
})