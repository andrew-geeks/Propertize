from flask import Flask,request,jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle

df = pd.read_csv('data/data.csv')

df = pd.read_csv("data/data.csv")

df["House_floor"]=df["Floor"].str.split(" ").str[0]
df["Total_floors"]=df["Floor"].str.split(" ").str[-1]
df.loc[df["House_floor"]=="Ground","House_floor"]=0
df["House_floor"] = df["House_floor"].replace(["Upper"],-1)
df["House_floor"] = df["House_floor"].replace(["Lower"],-1)

df["House_floor"] = df["House_floor"].astype(int)
df["Total_floors"] = df["Total_floors"].replace(["Ground"],1)
df["Total_floors"] = df["Total_floors"].astype(int)
del df["Floor"]

x = df.iloc[:,[1,3,4,6,7,8,9,11,12]]

model = pickle.load(open('model.pkl','rb'))

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'RFR model Home!'



#predict
@app.route('/predict',methods=['POST'])
def predict():
    
    pass


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0',port=2000)