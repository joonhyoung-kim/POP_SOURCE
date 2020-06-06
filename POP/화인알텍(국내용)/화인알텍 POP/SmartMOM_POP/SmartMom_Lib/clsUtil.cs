using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SmartMom_Lib
{
    public static class clsUtil
    {
        public static string _saveFolder = @"c:\excelFiles\";


        public static DataTable GetServiceData2(string serviceName, List<Dictionary<string, object>> paramList, string serviceURL, ref string retvalue)
        {
            DataTable dataTable = null;

            string data = GetServiceGet(serviceName, paramList, serviceURL);
             if (data != null && data.Contains(":"))
             {
                dataTable = JsonConvert.DeserializeObject<DataTable>(data);
            }
            else
            {
                dataTable = new DataTable();
            }

            return dataTable;
        }

        public static DataTable GetServiceData(string serviceName, List<Dictionary<string, object>> paramList, string serviceURL, ref string retvalue)
        {
            DataTable dataTable = null;

            string data = GetServiceGet(serviceName, paramList, serviceURL);
            if (data != null && data.Contains(":"))
            {
                dataTable = JsonConvert.DeserializeObject<DataTable>(data);
            }
            else
            {
                dataTable = new DataTable();
            }

            return dataTable;
        }

        //SSL 인증 무시
        public static bool AcceptAllCertifications(object sender, System.Security.Cryptography.X509Certificates.X509Certificate certification, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }

        public static string GetServiceGet(string serviceName, List<Dictionary<string, object>> paramsList, string serviceURL)
        {
            string result = null;

            //SSL 인증 무시
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);

            try
            {
                string parameters = "/" + serviceName + "?param=" + JsonConvert.SerializeObject(paramsList);
                string url = serviceURL + parameters;
                WebRequest request = WebRequest.Create(serviceURL + parameters);

                request.Method = "GET";
                request.ContentType = "application/json";

                WebResponse response = request.GetResponse();

                using (Stream stream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(stream, Encoding.UTF8);
                    result = reader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                string aaa = e.Message;
            }

            return result;
        }

        public static string GetServicePost(string serviceName, List<Dictionary<string, object>> paramsList, string serviceURL)
        {
            string result = null;

            //SSL 인증 무시
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);

            try
            {
                string parameters = "/" + serviceName + "?param=" + JsonConvert.SerializeObject(paramsList);
                WebRequest request = WebRequest.Create(serviceURL + parameters);

                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";

                Stream requestStream = request.GetRequestStream();
                byte[] postBytes = Encoding.UTF8.GetBytes(parameters);
                requestStream.Write(postBytes, 0, postBytes.Length);

                WebResponse response = request.GetResponse();


                Stream stream = response.GetResponseStream();
                StreamReader reader = new StreamReader(stream, Encoding.UTF8);
                result = reader.ReadToEnd();
            }
            catch (Exception e)
            {
                string aaa = e.Message;
            }

            return result;
        }

        public static string updateExecute(string serviceName, List<Dictionary<string, object>> paramList, string calltype)
        {
            string retbuf = "";

            string data = GetServiceGet(serviceName, paramList, calltype);
            if (data != null && data.Contains(":"))
            {
                Dictionary<string, object> resultMap = JsonConvert.DeserializeObject<Dictionary<string, object>>(data);

                retbuf = resultMap["result"].ToString();
            }

            return retbuf;

        }

        public static void form_save(string condition, DataSet dsForm, string formname)
        {
            try
            {
                string path = @"c:\pop";
                DirectoryInfo di = new DirectoryInfo(path);
                if (di.Exists == false)
                {
                    di.Create();
                }

                string filepath = path + "/" + formname;
                if (dsForm != null)
                {
                    dsForm.Tables.Add("condition");
                    dsForm.Tables["condition"].Columns.Add("condition");
                    dsForm.Tables["condition"].Rows.Add(condition);

                    dsForm.WriteXml(filepath + ".ds");
                }
                if (condition != "")
                {
                    File.WriteAllText(filepath + ".txt", condition);
                }
            }
            catch
            {
            }
        }

        public static void form_delete(string formname)
        {
            try
            {
                string path = @"c:\pop";
                DirectoryInfo di = new DirectoryInfo(path);
                if (di.Exists == false)
                {
                    di.Create();
                }

                string filepath = path + "/" + formname;
                File.Delete(filepath + ".ds");
                File.Delete(filepath + ".txt");
            }
            catch
            {
            }
        }

        public static DataSet form_load(string formname, ref string conBuf)
        {
            try
            {
                DataSet ds = new DataSet();
                string path = @"c:\pop";
                DirectoryInfo di = new DirectoryInfo(path);
                if (di.Exists == false)
                {
                    di.Create();
                }

                try
                {
                    string filepath = path + "/" + formname;
                    conBuf = File.ReadAllText(filepath + ".txt");
                }
                catch
                {
                }

                try
                {
                    string filepath = path + "/" + formname;
                    ds.ReadXml(filepath + ".ds");
                }
                catch
                {
                    return null;
                }

                return ds;
            }
            catch
            {
                return null;
            }
        }

        public static DataSet datatableToSet(params DataTable[] dt)
        {
            DataSet retDs = new DataSet();

            for(int i=0; i<dt.Length;i++)
            {
                retDs.Tables.Add(dt[i]);
                retDs.Tables[i].TableName = dt[i].TableName;
            }
            return retDs;
        }

        public static void bindGrid(DataTable dt, ref ExGrid grid)
        {
            for (int i = 0;i<dt.Rows.Count;i++)
            {
                grid.Rows.Add();
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    grid[j, i].Value = dt.Rows[i][j].ToString();
                }
            }
        }

        public static DataTable code_class_load(string code)
        {
            DataTable retDt = new DataTable();
            List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            paramsMap2.Add("p_err_code", "");
            paramsMap2.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap2.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap2.Add("CODE_CLASS_ID", code);
            paramsList2.Add(paramsMap2);
            string retvalue = "";
            retDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_nonwork_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);

            return retDt;
        }
    }
}
