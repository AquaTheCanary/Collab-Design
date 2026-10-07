from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "vectra-design-platform-secret-key"

# ---------------------------------------------------------
# Clean URL Routing Mapping
# ---------------------------------------------------------

@app.route('/')
def home():
    """ Clean URL: / -> serves templates/home/index.html """
    return render_template('home/index.html')

@app.route('/pricing')
def pricing():
    """ Clean URL: /pricing -> serves templates/pricing/pricing.html """
    return render_template('pricing/pricing.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """ Clean URL: /login -> serves templates/auth/login.html """
    if request.method == 'POST':
        flash("Logged in successfully!", "success")
        return redirect(url_for('editor'))
    return render_template('auth/login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    """ Clean URL: /signup -> serves templates/auth/signup.html """
    if request.method == 'POST':
        flash("Account created! Redirecting to canvas...", "success")
        return redirect(url_for('editor'))
    return render_template('auth/signup.html')

@app.route('/workspace-register', methods=['GET', 'POST'])
def workspace_register():
    """ Clean URL: /workspace-register -> serves templates/organization/register.html """
    if request.method == 'POST':
        org_name = request.form.get('org_name')
        flash(f"Team workspace '{org_name}' initialized!", "success")
        return redirect(url_for('editor'))
    return render_template('organization/register.html')

@app.route('/editor')
def editor():
    """ Clean URL: /editor -> serves templates/editor/canvas.html """
    return render_template('editor/canvas.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
