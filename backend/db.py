from dotenv import load_dotenv
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
load_dotenv()

# PostgreSQL connection URL
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_PORT = os.getenv('DB_PORT')

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Connect to the database
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor(cursor_factory=RealDictCursor)

# Create the goals table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS goals (
        uid SERIAL PRIMARY KEY,
        goal_name VARCHAR(255) NOT NULL,
        time_limit DATE NOT NULL,
        goal_amount DECIMAL(10, 2) NOT NULL,
        reward VARCHAR(255),
        time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')
conn.commit()

def get_all():
    cursor.execute('''
        SELECT time_limit, COUNT(*) as goal_count
        FROM goals
        GROUP BY time_limit
    ''')
    return cursor.fetchall()

def create_goal(goal_name, time_limit, goal_amount, reward=None):
    cursor.execute('''
        INSERT INTO goals (goal_name, time_limit, goal_amount, reward)
        VALUES (%s, %s, %s, %s)
        RETURNING uid
    ''', (goal_name, time_limit, goal_amount, reward))
    conn.commit()
    return cursor.fetchone()['uid']

def read_goal(uid):
    cursor.execute('''
        SELECT * FROM goals WHERE uid = %s
    ''', (uid,))
    return cursor.fetchone()

def update_goal(uid, goal_name=None, time_limit=None, goal_amount=None, reward=None):
    updates = []
    params = []
    if goal_name:
        updates.append('goal_name = %s')
        params.append(goal_name)
    if time_limit:
        updates.append('time_limit = %s')
        params.append(time_limit)
    if goal_amount:
        updates.append('goal_amount = %s')
        params.append(goal_amount)
    if reward:
        updates.append('reward = %s')
        params.append(reward)
    params.append(uid)
    cursor.execute(f'''
        UPDATE goals SET {', '.join(updates)} WHERE uid = %s
    ''', params)
    conn.commit()

def delete_goal(uid):
    cursor.execute('''
        DELETE FROM goals WHERE uid = %s
    ''', (uid,))
    conn.commit()
