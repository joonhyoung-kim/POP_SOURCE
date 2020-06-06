using FarPoint.Win.Spread;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using System.IO;
using SmartMom_Lib;

namespace SmartMOM_POP
{
    public partial class frmReport : Form
    {
        public frmReport()
        {
            InitializeComponent();
            //spreadMain.OpenExcel(@"D:\temp\폴란드_GANBAN.xlsx");
            //draw_data();

            excel_download();
            image_download();

        }

        private DataTable excel_download()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("EXCEL_ID", "MOMCC014");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_excel_download.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            String filetext = dt.Rows[0]["EXCELFILE"].ToString();
            string filename = dt.Rows[0]["EXCELFILENAME"].ToString();

            Byte[] bytes = Convert.FromBase64String(filetext);
            File.WriteAllBytes(@"d:\temp\" + filename, bytes);

            return dt;
        }


        private DataTable image_download()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", "FAKP");
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("ITEM_ID", "AAN75849303");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_image_download.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            String filetext = dt.Rows[0]["ATTACH1"].ToString();
            string filename = dt.Rows[0]["ATTACH_NAME1"].ToString();

            Byte[] bytes = Convert.FromBase64String(filetext);
            File.WriteAllBytes(@"d:\temp\" + filename, bytes);

            return dt;
        }


        private void draw_data()
        {
            FarPoint.Win.Spread.CellType.TextCellType t = new FarPoint.Win.Spread.CellType.TextCellType();
            FarPoint.Win.Picture p = new FarPoint.Win.Picture(Image.FromFile(@"C:\Users\withg\Desktop\hs_m1.jpg"), FarPoint.Win.RenderStyle.Stretch);
            t.BackgroundImage = p;
            spreadMain.Sheets[0].Cells[17, 1].CellType = t;

            //FarPoint.Win.Spread.CellType.TextCellType t1 = new FarPoint.Win.Spread.CellType.TextCellType();
            //FarPoint.Win.Picture p1 = new FarPoint.Win.Picture(Image.FromFile(@"C:\Users\withg\Desktop\ul1.jpg"), FarPoint.Win.RenderStyle.Stretch);
            //t1.BackgroundImage = p1;
            //spreadMain.Sheets[0].Cells[4, 1].CellType = t1;

            FarPoint.Win.Spread.CellType.BarCodeCellType barc = new FarPoint.Win.Spread.CellType.BarCodeCellType();
            barc.DisplayMode = FarPoint.Win.Spread.CellType.BarCodeDisplayMode.Image;
            barc.Message = true;
            barc.MessagePosition = FarPoint.Win.Spread.CellType.BarCode.MessagePosition.Left;
            barc.MessageValue = "K7B50XMN1E63952702XX0";

            int icnt = 0;
            int rowNumber = 1;
            int columnNumber = 7;
            barc.Type = new FarPoint.Win.Spread.CellType.BarCode.Code128();
            spreadMain.Sheets[0].Cells[2, 2].CellType = barc;
            spreadMain.Sheets[0].Cells[2, 2].Value = "K7B50XMN1E63952702XX0";

            //spreadMain.Sheets[0].Cells[0,1].Value = 

            //spreadMain.ActiveSheet.Cells[1, 1].CellType = t;
            //spreadMain.ActiveSheet.Rows[1].Height = 50;
            //spreadMain.ActiveSheet.Columns[1].Width = 150;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            PrintInfo info = new PrintInfo();

            //여백 설정하고
            //info.Margin = new PrintMargin(10, 10, 50, 50, 100, 50);
            //info.Margin = new Spd.SpdPrint_Margin(10, 10, 50, 50, 100, 50);
            //여백 설정 함수를 아래에 풀어서 해석
            PrintMargin mg = new PrintMargin();
            mg.Header = 0;
            mg.Footer = 0;
            mg.Top = 0;
            mg.Bottom = 0;
            mg.Left = 0;
            mg.Right = 0;

            //옵션 설정하고
            //setoption = new Spd.SpdPrint_SetOption(FarPoint.Win.Spread.PrintOrientation.Portrait, FarPoint.Win.Spread.PrintType.All, 0, 0, true, false, true, true, false, false, false);
            //옵션 설정 함수 부분을 풀어서 아래에 기술 한것
            //전체인쇄(현재페이지,전체,선택페이지,지정페이지)
            info.PrintType = FarPoint.Win.Spread.PrintType.All;
            //(전체인쇄)에서 지정된 페이지일 경우 페이지 설정
            info.PageStart = 0;
            info.PageEnd = 0;
            //컬럼 헤드를 보일 경우(세로)
            info.ShowRowHeaders = false;
            //컬럼 로우를 보일 경우(가로,제목 이다)
            info.ShowColumnHeaders = false;
            //그리드 라인을 표기할 것인가 말것인가(선 말이다)
            info.ShowGrid = false;
            //페이지 보드 설정(외곽 선, 바깥 네모를 보일것인가)
            info.ShowBorder = false;
            //스트레드 그림자 설정
            info.ShowShadows = false;
            //컬러 설정
            info.ShowColor = true;

            info.Orientation = FarPoint.Win.Spread.PrintOrientation.Portrait;
            info.ZoomFactor = 0.96F;
            //info.Opacity = 100;
            //info.ShowPrintDialog = true;
            //info.Preview = true;

            //페이지 자동 설정 부분(페이지 크기를 자동으로 맞출것인가)
            //info.UseSmartPrint = true;
            //가로세로페이지 설정(자동,가로,세로)
            //info.Orientation = FarPoint.Win.Spread.PrintOrientation.Landscape;
            //info.Centering = Centering.Both;

            //여백 적용하고(위에서 정한 프린터 여백을 적용시키기)
            //info.Margin = margin.margin;
            info.Margin = mg;

            //출력전 미리보기 하겠다고 하고
            info.Preview = true;

            info.ColStart = 0;
            info.ColEnd = 13;
            info.RowStart = 0;
            info.RowEnd = 63;
            //info.Preview = true;
            info.PrintType = FarPoint.Win.Spread.PrintType.CellRange;

            info.JobName = "SmartMOM";
            info.PageOrder = FarPoint.Win.Spread.PrintPageOrder.Auto;
            info.PaperSize = new System.Drawing.Printing.PaperSize("A4", 2100, 2970);


            //info.ZoomFactor = 0.9F;
            spreadMain.Sheets[0].PrintInfo = info;
            //spreadMain.ActiveSheet.PrintInfo.Preview = true;
            spreadMain.PrintSheet(0);
        }

        private void button2_Click(object sender, EventArgs e)
        {
            spreadMain.SaveExcel(@"C:\Users\withg\Desktop\test2.xls");
            return;
        }
    }
}
