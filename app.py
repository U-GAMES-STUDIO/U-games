from flask import Flask, render_template, request, redirect, url_for, session
import os

# Tworzymy aplikację Flask i ustawiamy odpowiednie foldery
app = Flask(__name__, 
            template_folder=os.path.join(os.getcwd(), 'templates'), 
            static_folder=os.path.join(os.getcwd(), 'static'))

app.secret_key = 'your_secret_key_here'  # Dodajemy sekretny klucz dla sesji

# Funkcja pomocnicza do zapisywania użytkowników w pliku
def save_user(username, password):
    with open('users.txt', 'a') as file:
        file.write(f"{username},{password}\n")

# Funkcja pomocnicza do sprawdzania, czy użytkownik istnieje
def user_exists(username):
    if not os.path.exists('users.txt'):
        return False
    with open('users.txt', 'r') as file:
        users = file.readlines()
        for user in users:
            stored_username, _ = user.strip().split(',')
            if stored_username == username:
                return True
    return False

# Funkcja pomocnicza do sprawdzania danych logowania
def validate_user(username, password):
    if not os.path.exists('users.txt'):
        return False
    with open('users.txt', 'r') as file:
        users = file.readlines()
        for user in users:
            stored_username, stored_password = user.strip().split(',')
            if stored_username == username and stored_password == password:
                return True
    return False

# Funkcja do wyświetlania szczegółów gry
@app.route('/game-details')
def game_details():
    return render_template('game-details.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if validate_user(username, password):
            session['username'] = username  # Zapisujemy nazwę użytkownika w sesji
            return redirect(url_for('user_panel'))
        else:
            return "Błąd logowania. Spróbuj ponownie."
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if user_exists(username):
            return "Użytkownik już istnieje. Spróbuj inną nazwę."
        
        save_user(username, password)
        return redirect(url_for('login'))
    return render_template('register.html')
    
@app.route('/user_panel')
def user_panel():
    if 'username' in session:
        username = session['username']
        return render_template('user_panel.html', username=username)
    return redirect(url_for('login'))  # Jeśli użytkownik nie jest zalogowany, przekierowanie do logowania

@app.route('/logout')
def logout():
    session.pop('username', None)  # Usuwamy użytkownika z sesji
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
