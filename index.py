import os
import time
import smtplib
import random
from email.message import EmailMessage

print("Welcome!\nLet's get you going.\n")
name = input("Step 1\nWhat is your name?\n")
os.system("cls" if os.name == "nt" else "clear")

print("OK, " + name + ", \nLet's continue with setup.")
time.sleep(2.5)
os.system("cls" if os.name == "nt" else "clear")

print("Let's give you the right experience.\n\nStep 2")
while True:
    try:
        age = int(input("How old are you?\n"))
        break
    except ValueError:
        print("Please try again.")

if age < 18:
    print("Sorry, " + name + ", you need to be at least 18 years old to register for this.")
    exit() # Exit the program if underage
else:
    print("OK, " + name + ",\nWe've saved your age as " + str(age) + ".")

# --- Step 3: Email Verification ---
print("\nStep 3\nLet's verify your email.")
user_email = input("What is your email address?\n")

# Sender credentials
SENDER_EMAIL = "aquathecanary@gmail.com"
# Replace with your actual 16-character Google App Password (do not include spaces)
APP_PASSWORD = "mxsl jvhu ahxw hvco" 

# Generate a random 6-digit verification code
verification_code = str(random.randint(100000, 999999))

# Construct the email message
msg = EmailMessage()
msg['Subject'] = 'Your Setup Verification Code'
msg['From'] = SENDER_EMAIL
msg['To'] = user_email
msg.set_content(f"Hello, {name},\n\nWelcome to the platform!\n\nTo verify your email, please enter the code below:\n{verification_code}\n\nThank you for registering and enjoy the platform!\n\n\nKind regards,\nArchie Sneddon")

print(f"\nSending a verification code to {user_email}...")

try:
    # Connect to Gmail's SMTP server securely
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(SENDER_EMAIL, APP_PASSWORD)
        smtp.send_message(msg)
    print("Email sent successfully!")
except Exception as e:
    print(f"\nFailed to send email. Error: {e}")
    print("Please check your App Password and internet connection.")
    exit()

# Prompt the user until they enter the correct code
while True:
    entered_code = input("\nEnter the 6-digit code we sent you (or type 'quit' to exit): ")
    
    if entered_code.lower() == 'quit':
        print("Setup cancelled.")
        exit()
    elif entered_code == verification_code:
        print("\nVerification successful! Your account setup is complete.")
        break
    else:
        print("Incorrect code. Please try again.")
