import pandas as pd
import pyodbc as db
import configparser
import json

class SQL:

    def __init__(self):
        conf = configparser.ConfigParser()
        conf.read("webconfig/webconfig.cs")
        driver = conf.get("archivoconfig", "Driver")
        server = conf.get("archivoconfig", "server")
        database = conf.get("archivoconfig", "database")
        self.Cadena = "Driver={0};server={1};database={2};Trusted_Connection=yes".format(driver,server,database)

    def listar_html(self,consulta):
        cn = db.connect(self.Cadena)
        df = pd.read_sql_query(consulta,cn)
        data = df.to_html(index=False)
        cn.close()
        return data

    def listar_json(self,consulta):
        cn = db.connect(self.Cadena)
        df = pd.read_sql_query(consulta, cn)
        data = df.to_json(orient= "records")
        cn.close()
        return json.loads(data)

    def enviarPost(self,consulta):
        try:
            cn = db.connect(self.Cadena)
            cursor = cn.cursor()
            registrosafectados=cursor.execute(consulta).rowcount
            cursor.commit()
            cn.close()
        except Exception as error:
            registrosafectados= error
        return registrosafectados


    def enviarTransaccion(self,consulta):
        try:
            cn=db.connect(self.Cadena)
            cursor = cn.cursor()
            cursor.execute("SET NOCOUNT ON; "+consulta)
            registros = cursor.fetchval()
            cursor.commit()
            cn.close()
            return registros
        except Exception as error:
            registros = "error" + str(error)
        return registros
