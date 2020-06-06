using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace SmartMom_Lib
{
    public static class clsReport
    {
        public static string directory = @"C:\SMARTMOM\MOM.RPT\REPORT\";

        public static void delete_files()
        {
            DirectoryInfo dir = new DirectoryInfo(directory);
            if (!Directory.Exists(directory))
            { // if it doesn't exist, create
                System.IO.Directory.CreateDirectory(directory);
            }
            //repx 파일 찾기
            FileInfo[] files = dir.GetFiles("*.*");

            //동일 경로에 있는 repx 파일 모두 삭제
            if (files.Length >= 1)
            {
                foreach (FileInfo fileinfo in files)
                {
                    fileinfo.Delete();
                }
            }
        }

        /// <summary>
        /// Report 디자인 파일 다운로드
        /// </summary>
        public static DataTable excel_download(string excelId)
        {
            try
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("EXCEL_ID", excelId);
                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_excel_download.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

                if (dt != null)
                {
                    String filetext = dt.Rows[0]["EXCELFILE"].ToString();
                    string filename = dt.Rows[0]["EXCELFILENAME"].ToString();

                    Byte[] bytes = Convert.FromBase64String(filetext);

                    if (!Directory.Exists(directory))
                    { // if it doesn't exist, create
                        System.IO.Directory.CreateDirectory(directory);
                    }

                    File.WriteAllBytes(directory + filename + ".repx", bytes);
                }

                return dt;
            }
            catch(Exception e)
            {
                return null;
            }

           
        }

        /// <summary>
        /// 품목 이미지 파일 다운로드
        /// </summary>
        public static DataTable image_download(string itemId)
        {
            try
            {
                if (!Directory.Exists(directory))
                { // if it doesn't exist, create
                    System.IO.Directory.CreateDirectory(directory);
                }

                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("ITEM_ID", itemId);

                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_image_download.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

                if (dt != null)
                {
                    String filetext1 = dt.Rows[0]["ATTACH1"].ToString();
                    string filename1 = dt.Rows[0]["ATTACHNAME1"].ToString();

                    Byte[] bytes = Convert.FromBase64String(filetext1);
                    File.WriteAllBytes(directory + filename1, bytes);

                    String filetext2 = dt.Rows[0]["ATTACH2"].ToString();
                    string filename2 = dt.Rows[0]["ATTACHNAME2"].ToString();

                    if (filetext2 != "")
                    {
                        Byte[] bytes2 = Convert.FromBase64String(filetext2);
                        File.WriteAllBytes(directory + filename2, bytes2);
                    }

                }

                return dt;
            }
            catch (Exception e)
            {
                //품목에 이미지 파일이 존재하지 않습니다.
                //frmMessage frm = new frmMessage($"{itemId} Item no image file exists.", "AUTOCLOSE");
                //frm.ShowDialog();
                return null;
            }
        }

        /// <summary>
        /// JSON 파일 생성
        /// </summary>
        public static void createJsonFile (string json, string lebelId)
        {
            if (!Directory.Exists(directory))
            { // if it doesn't exist, create
                System.IO.Directory.CreateDirectory(directory);
            }

            string file = directory + lebelId + ".json";

            StreamWriter textWrite = File.CreateText(file); //생성
            textWrite.WriteLine(json); //쓰기
            textWrite.Dispose(); //파일 닫기
        }


        /// <summary>
        /// JSON 데이터 생성
        /// </summary>
        public static string ConvertJSON(TResponse resp)
        {
            string JSONString = "";

            JSONString = JsonConvert.SerializeObject(resp);
            return JSONString;
        }

        /// <summary>
        /// dataTable을 Json데이터로 변환한다.
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static TResponse ConvertResponse(DataTable table, int startRow = -1, int count = 0)
        {
            TResponse res = new TResponse(null);
            res.IsSuccess = true;
            table.TableName = "OUT_CUR0";

            Dictionary<string, TColumn> dic = new Dictionary<string, TColumn>();
            for (int row = (startRow < 0 ? 0 : startRow); row < (count <= 0 ? table.Rows.Count : (startRow < 0 ? 0 : startRow) + count); row++)
            {
                if (table.Rows.Count < row)
                {
                    break;
                }
                DataRow dr = table.Rows[row];
                foreach (DataColumn column in dr.Table.Columns)
                {
                    if (!dic.ContainsKey(column.ColumnName))
                    {
                        dic[column.ColumnName] = new TColumn();
                    }

                    TColumn col = dic[column.ColumnName];
                    col.ColumnId = column.ColumnName.ToUpper();
                    if (col.ColumnData == null)
                    {
                        col.ColumnData = new List<object>();
                    }
                    col.ColumnData.Add(dr[column.ColumnName]);
                }
            }

            TTable t = new TTable();
            t[table.TableName] = new Collection<TColumn>();
            foreach (string key in dic.Keys)
            {
                t[table.TableName].Add(dic[key]);
            }

            // 결과 반영
            res.Response[0] = t;
            return res;
        }
    }

}
