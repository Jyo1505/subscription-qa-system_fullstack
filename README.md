Create subscriptions using a payment gateway (like stripe, razorpay) to post questions in stackoverflow.
Testcase: Free Plan can post only 1 question a day, 
bronze plan will be ₹100/month which can post 5 questions a day , silver plan will be ₹300/month which can post 10 questions a day
and gold plan can post unlimited questions and priced at ₹1000/month .After payment we should trigger an email to user with invoice and plan details. 
The payment system should work on 10 to 11 AM IST timing if we try payment after that time frame we should not allow user to pay .


https://subscription-system-full.netlify.app/
