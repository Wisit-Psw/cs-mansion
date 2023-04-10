from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import mysql.connector
import base64 as base
# import aiofiles
import random
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
# login
@app.get("/Login/{RoomID}/{Phone}")
async def Login(RoomID:int,Phone:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    print("SELECT RoomID FROM tenant  WHERE RoomID = "+str(RoomID)+" and (TenantPhone1 LIKE '"+Phone+"' OR TenantPhone2 LIKE '"+Phone+"') AND TenantEnd IS NULL")
    try:
        cur = cnx.cursor()
        cur.execute("SELECT RoomID FROM tenant  WHERE RoomID = "+str(RoomID)+" and (TenantPhone1 LIKE '"+Phone+"' OR TenantPhone2 LIKE '"+Phone+"') AND TenantEnd IS NULL")
        select = cur.fetchall()
        if len(select) == 1:
            STR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            genkey = STR[random.randint(0,51)]+str(random.randint(0, 9))+str(RoomID)+STR[random.randint(0,51)]+str(random.randint(0, 9))+Phone+STR[random.randint(0,51)]+str(random.randint(0, 9))
            sql = "INSERT INTO `loginsession`(`SessionID`, `RoomID`) VALUES (%s,%s)"
            val = (genkey,str(RoomID))
            cur.execute(sql,val)
            cnx.commit()
            cnx.close()
            return {"login":True,"key":genkey}
        return  {"login":False,"key":None}
    except Exception as e :
        print(e)
    cnx.close()
    return 0
    

#saveloginn
@app.get("/getsession/{SessionID}")
async def getsession(SessionID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        cur.execute("SELECT * FROM `loginsession` WHERE `SessionID` LIKE '"+SessionID+"'")
        select = cur.fetchall()
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0
    
# logout
@app.get("/Logout/{SessionID}")
async def Logout(SessionID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        cur.execute("DELETE FROM `loginsession` WHERE `SessionID` LIKE '"+SessionID+"'")
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0
    
#---------------------get---------------------
#billinputstatus
@app.get("/getinputbillstatus/{RoomID}")
async def getinputbillstatus(RoomID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        currentTime = datetime.now()
        cur = cnx.cursor()
        cur.execute("SELECT * FROM `bill` WHERE RoomID ="+str(RoomID)+" AND DAY(Date) > "+str(5)+" AND MONTH(Date) = "+str(currentTime.month)+"  AND YEAR(Date) = "+str(currentTime.year))
        select = cur.fetchall() 
        cnx.commit()
        return {"status":len(select)==0 and (currentTime.day >= 25 or currentTime.day <=15),"select":select}
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#Tenant
@app.get("/getalltenant")
async def getinputbillstatus()-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        currentTime = datetime.now()
        cur = cnx.cursor()
        cur.execute("SELECT * FROM `Tenant` WHERE TenantEnd IS NULL AND RoomID !=0 ORDER BY RoomID ")
        select = cur.fetchall() 
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#userdata
@app.get("/getuserdata/{Phone}")
async def getuserdata(Phone:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        cur.execute("SELECT * FROM `user` WHERE Phone ="+Phone)
        select = cur.fetchall() 
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#alluser
@app.get("/getTenantuser")
async def getTenantuser()-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        cur.execute("SELECT TenantPhone1,TenantPhone2 FROM `tenant` ")
        select = cur.fetchall()
        
        arr = '('
        for i in select:
            arr+="'"+str(i[0])+"'"
            if(i[0]!=select[len(select)-1][0]) or str(i[1])!="None":
                arr+=","
            if(str(i[1])!="None"):
                arr+="'"+str(i[1])+"'"
                if(i[0]!=select[len(select)-1][0]):
                    arr+=","
                    
        arr+=')'
        cur = cnx.cursor()
        cur.execute("SELECT * FROM `user` WHERE `Phone` IN "+arr)
        select3 = cur.fetchall() 
        cnx.commit()
        return select3
    except Exception as e :
        print(e)
    cnx.close()
    return 0
#####################################################################################
#roomdata
@app.get("/getroomdata/{RoomID}/{Status}")
async def getroomdata(RoomID:str,Status:int)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        sql = "SELECT * FROM `room` " 
        if Status != -1 or  RoomID not in ['',' ',"None"]:
            sql += " WHERE "
            if Status != -1:
                sql += " StatusID = "+str(Status)
            if Status != -1 and  RoomID not in ['',' ',"None"]:
                sql += " and "
            if RoomID not in ['',' ',"None"] :
                sql += " RoomID = "+str(RoomID) 
        cur.execute(sql)
        select = cur.fetchall() 
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#tenant
@app.get("/gettenant/{RoomID}")
async def gettenant(RoomID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "SELECT * FROM `tenant` "
        if RoomID not in ['',' ',None] :
            sql += " WHERE  RoomID = "+str(RoomID)+" AND TenantEnd IS NULL"
        
        cur = cnx.cursor()
        cur.execute(sql)
        select = cur.fetchall() 
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#bill
@app.get("/getbill/{RoomID}/{Status}")
async def getreport(RoomID:str,Status:int)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        
        cur = cnx.cursor()
        sql = "SELECT * FROM `bill` INNER JOIN `Tenant` ON bill.RoomID=Tenant.RoomID "
        if Status != -1 or  RoomID not in ['',' ',None] :
            sql += " WHERE "
        if RoomID not in ['',' ',None] :
            sql += " Tenant.RoomID = "+str(RoomID) 
            sql += " AND (bill.Date >= Tenant.TenantEnd OR Tenant.TenantEnd IS NULL  )"
        if (RoomID not in ['',' ',None] ) and Status != -1 :
            sql += " AND "
        if Status != -1:
            sql += " bill.BillStatusID = "+str(Status)
        print(sql)
        cur.execute(sql)
        select = cur.fetchall() 
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#roomprice
@app.get("/getroomprice/{RoomID}")
async def getroomprice(RoomID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        cur.execute("SELECT * FROM room  WHERE RoomID = "+RoomID)
        select = cur.fetchall()
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#eachprice
@app.get("/geteachprice")
async def geteachprice()-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        cur.execute("SELECT * FROM eachprice WHERE 1")
        select = cur.fetchall()
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#report
@app.get("/getreport/{Status}/{RoomID}")
async def getreport(Status:int,RoomID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        sql = "SELECT * FROM `report` "
        if Status != -1 or  RoomID not in ['',' ',"None"]:
            sql += " WHERE "
            if Status != -1:
                sql += " StatusID = "+str(Status)
            if Status != -1 and  RoomID not in ['',' ',"None"]:
                sql += " and "
            if RoomID not in ['',' ',"None"] :
                sql += " RoomID = "+str(RoomID) 
        
        cur.execute(sql)
        select = cur.fetchall() 
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#billstatus
@app.get("/billstatus/{StatusID}")
async def getuserdata(StatusID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        cur = cnx.cursor()
        cur.execute("SELECT * FROM `billstatus` WHERE BillStatusID ="+StatusID)
        select = cur.fetchall() 
        cnx.commit()
        return select
    except Exception as e :
        print(e)
    cnx.close()
    return 0


#---------------------------post-------------------------
#user
@app.post("/postuser/{Name}/{PeopleID}/{Address}/{Phone}")
async def postuser(Name:str,PeopleID:str,Address:str,Phone:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "INSERT INTO `user`(`Name`, `PeopleID`, `Address`, `Phone`) VALUES (%s, %s, %s, %s)"
        val = (Name, PeopleID,Address, Phone)
        cur = cnx.cursor()
        cur.execute(sql,val)
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#Tenant
@app.post("/posttenant/{userphone1}/{userphone2}/{RoomID}")
async def postuser(userphone1:str,userphone2:str,RoomID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    
    try:
        if userphone2 in ["-1",' ',None]:
            userphone2 = 'NULL'
        else:
            userphone2 = "'"+userphone2+"'"
        print("INSERT INTO `tenant`( `TenantPhone1`, `TenantPhone2`, `RoomID`) VALUES ('"+userphone1+"',"+userphone2+","+RoomID+")")
        sql = "INSERT INTO `tenant`( `TenantPhone1`, `TenantPhone2`, `RoomID`) VALUES ('"+userphone1+"',"+userphone2+","+RoomID+")"
        # val = ("'"+userphone1+"'",userphone2 ,RoomID)
        cur = cnx.cursor()
        cur.execute(sql)
        cnx.commit()
        
        sql = "UPDATE `room` SET StatusID = 1 WHERE RoomID = "+RoomID
        print(sql)
        cur = cnx.cursor()
        cur.execute(sql)
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#unit
@app.post("/postunit/{RoomID}/{water}/{electric}")
async def postunit(RoomID:str,water:float,electric:float)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        total = 0;
        cur = cnx.cursor()
        cur.execute("SELECT * FROM room  WHERE RoomID = "+RoomID)
        select = cur.fetchall()
        
        cur = cnx.cursor()
        cur.execute("SELECT * FROM eachprice ORDER BY PriceID DESC LIMIT 1")
        select2 = cur.fetchall()
        
        cur = cnx.cursor()
        cur.execute("SELECT * FROM tenant WHERE RoomID = "+RoomID)
        select3 = cur.fetchall()
        
        sumele=float(select2[0][1])*electric
        sumwater=float(select2[0][2])*water
        Internet = select3[0][4]*select2[0][3]
        commandcost = float(select2[0][4])
        total = float(sumele)+sumwater+Internet+commandcost+select[0][2]
        sql = "INSERT INTO `bill`(`RoomID`, `Water`, `Electric`, `Internet`, `Commond`, `Total`) VALUES (%s,%s,%s, %s, %s, %s)"
        val = (str(RoomID),str(water), str(electric),str(Internet),str(commandcost),str(total))
        cur = cnx.cursor()
        cur.execute(sql,val)
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0
    
#report
@app.post("/postreport/{RoomID}/{TextContent}")
async def postreport(RoomID:str,TextContent:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "INSERT INTO `report`(`RoomID`, `ReportContent`) VALUES (%s,%s)"
        val = (str(RoomID),str(TextContent))
        cur = cnx.cursor()
        cur.execute(sql,val)
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0
    

#---------------------------delete-------------------------

#deletereport
@app.delete("/deletereport/{ReportID}")
async def deletereport(ReportID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "DELETE FROM `report` WHERE `ReportID` = "+ReportID
        # val = (ReportID)
        cur = cnx.cursor()
        cur.execute(sql) #,val
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0

#deletebill
@app.delete("/deletebill/{RoomID}/{Date}")
async def deletereport(RoomID:str,Date:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "DELETE FROM `bill` WHERE `RoomID` = %s AND Date = %s"
        val = (RoomID,Date)
        cur = cnx.cursor()
        cur.execute(sql,val) #
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0
#---------------------------update-------------------------
@app.put("/checkreport/{ReportID}")
async def checkreport(ReportID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "UPDATE `report` SET `StatusID`= 2 WHERE `ReportID` = "+ReportID
        # val = (ReportID)
        cur = cnx.cursor()
        cur.execute(sql) #,val
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0

@app.put("/putslip")
async def putslip(Content:Request)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        result = await Content.json()
        sql = "UPDATE `bill` SET `BillStatusID`=3,`Slip`=%s WHERE `RoomID` = %s AND `Date` = %s"
        val = (str(result['file']),str(result['RoomID']),str(result['Date']))
        print(str(result['file']))
        # val = (ReportID)
        cur = cnx.cursor()
        cur.execute(sql,val) #,val
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0

@app.put("/updatestate/{RoomID}/{Date}/{Status}")
async def updatestate(RoomID:str,Date:str,Status:str)-> dict:
    print(RoomID,Date,Status)
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        if(int(Status)==2):
            sql = "UPDATE `bill` SET `BillStatusID`=%s WHERE `RoomID` = %s AND `Date` = %s"
            val = (str(Status),str(RoomID),str(Date))
            print(sql,val)
            cur = cnx.cursor()
            cur.execute(sql,val) #,val
            cnx.commit()
            cnx.close()
            print(sql,val)
        elif(int(Status)==4):
            sql = "UPDATE `bill` SET `BillStatusID`=%s WHERE `RoomID` = %s AND `Date` = %s"
            val = (str(Status),str(RoomID),str(Date))
            print(sql,val)
            cur = cnx.cursor()
            cur.execute(sql,val) #,val
            cnx.commit()
            cnx.close()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0

@app.put("/moveout/{RoomID}")
async def checkreport(RoomID:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    currentTime = datetime.now()
    try:
        sql = "UPDATE `room` SET `StatusID`= 0 WHERE `RoomID` = "+RoomID
        # val = (ReportID)
        cur = cnx.cursor()
        cur.execute(sql) #,val
        cnx.commit()
        
        sql = "UPDATE `tenant` SET `TenantEnd`='"+str(currentTime.year)+"-"+str(currentTime.month)+"-"+str(currentTime.day)+"' WHERE `RoomID`="+RoomID+" ORDER BY `TenantID` DESC LIMIT 1 "
        # val = (ReportID)
        cur = cnx.cursor()
        cur.execute(sql) #,val
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0
@app.put("/updateroom/{RoomID}/{Roomprice}")
async def checkreport(RoomID:str,Roomprice:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "UPDATE `room` SET `Price`= "+Roomprice+" WHERE `RoomID` = "+RoomID
        # val = (ReportID)
        cur = cnx.cursor()
        cur.execute(sql) #,val
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0
@app.put("/updateuser/{phone}/{name}/{address}/{newphone}")
async def checkreport(phone:str,name:str,address:str,newphone:str)-> dict:
    cnx = mysql.connector.connect(user='root', password='Wisit.comsci2003', host='localhost', database='cs-mansion',raise_on_warnings = True)
    try:
        sql = "UPDATE `user` SET `Name`= '"+name+"',`Address`= '"+address+"',`Phone`= '"+newphone+"' WHERE `Phone` = "+phone
        # val = (ReportID)
        cur = cnx.cursor()
        cur.execute(sql) #,val
        cnx.commit()
        return 1
    except Exception as e :
        print(e)
    cnx.close()
    return 0
