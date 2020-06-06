using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;

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
            System.Console.WriteLine("#### serviceName = " + serviceName);
            foreach (Dictionary<string, object> dic in paramList)
            {
                foreach (KeyValuePair<string, object> val in dic)
                {
                    Console.WriteLine("{0} : {1}", val.Key, val.Value);
                }
            }

            DataTable dataTable = null;

            string data = GetServiceGet(serviceName, paramList, serviceURL);
            System.Console.WriteLine("#### data = " + data + "\n");
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
                string parameters = "/" + serviceName + "?param=" + HttpUtility.UrlEncode(JsonConvert.SerializeObject(paramsList));
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
    }
}
