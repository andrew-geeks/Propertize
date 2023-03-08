import pandas as pd
import numpy as np
import seaborn as sns
import pickle

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
y = df.iloc[:,2]

x_d = pd.get_dummies(x, columns=["Area Type","City","Furnishing Status","Tenant Preferred"])

from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test = train_test_split(x_d,y,test_size=0.2,random_state=42)

from sklearn.ensemble import RandomForestRegressor
regressor = RandomForestRegressor(n_estimators=17,random_state=0)
regressor.fit(x_train,y_train)

pickle.dump(regressor, open('model.pkl','wb'))
model = pickle.load(open('model.pkl','rb'))

newData = pd.get_dummies(pd.DataFrame({'BHK':[1],'Size':[1000],'Area Type':['Super Area'],'City':['Kolkata'],'Furnishing Status':['Furnished'],'Tenant Preferred':['Family'],'Bathroom':[2],'House_floor':[2],'Total_floors':[5]}))
dummies_frame = pd.get_dummies(x,columns=["Area Type","City","Furnishing Status","Tenant Preferred"])
newData = newData.reindex(columns = dummies_frame.columns, fill_value=0)

pred = regressor.predict(newData)
print((pred[0]))



