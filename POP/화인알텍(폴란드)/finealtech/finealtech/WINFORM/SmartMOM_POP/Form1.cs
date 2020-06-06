using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class Form1 : Form
    {
        HSSFWorkbook hssfworkbook = new HSSFWorkbook();
        public Form1()
        {
            InitializeComponent();

            //copy_sheet();
            image_process();
            return;

            //load_process();

            using (FileStream file = new FileStream(@"D:\temp\폴란드_GANBAN.xls", FileMode.Open, FileAccess.Read))
            {
                hssfworkbook = new HSSFWorkbook(file);
            }

            Sheet sheet1 = hssfworkbook.GetSheet("Sheet1");

            //sheet1.SetMargin(MarginType.RightMargin, (double)0.5);
            //sheet1.SetMargin(MarginType.TopMargin, (double)0.6);
            //sheet1.SetMargin(MarginType.LeftMargin, (double)0.4);
            //sheet1.SetMargin(MarginType.BottomMargin, (double)0.3);


            //sheet1.PrintSetup.Copies = 3;
            //sheet1.PrintSetup.NoColor = true;
            //sheet1.PrintSetup.Landscape = true;
            //sheet1.PrintSetup.PaperSize = (short)PaperSize.A4;

            //sheet1.FitToPage = true;
            //sheet1.PrintSetup.FitHeight = 2;
            //sheet1.PrintSetup.FitWidth = 3;
            //sheet1.IsPrintGridlines = true;

            HSSFRow dataRow = (HSSFRow)sheet1.GetRow(3);

            dataRow.GetCell(2).SetCellValue("PartNumber11111");

            //sheet1.CreateRow(3).CreateCell(2).SetCellValue("PartNumber11111");
            //int x = 1;
            //for (int i = 1; i <= 15; i++)
            //{
            //    Row row = sheet1.CreateRow(i);
            //    for (int j = 0; j < 15; j++)
            //    {
            //        row.CreateCell(j).SetCellValue(x++);
            //    }
            //}

            //Sheet sheet2 = hssfworkbook.CreateSheet("Sheet2");
            //sheet2.PrintSetup.Copies = 1;
            //sheet2.PrintSetup.Landscape = false;
            //sheet2.PrintSetup.Notes = true;
            //sheet2.PrintSetup.EndNote = true;
            //sheet2.PrintSetup.CellError = DisplayCellErrorType.ErrorAsNA;
            //sheet2.PrintSetup.PaperSize = (short)PaperSize.A5;

            //x = 100;
            //for (int i = 1; i <= 15; i++)
            //{
            //    Row row = sheet2.CreateRow(i);
            //    for (int j = 0; j < 15; j++)
            //    {
            //        row.CreateCell(j).SetCellValue(x++);
            //    }
            //}

            WriteToFile();


        }

        private void image_process()
        {
            Sheet sheet1 = hssfworkbook.CreateSheet("PictureSheet");
            HSSFPatriarch patriarch = (HSSFPatriarch)sheet1.CreateDrawingPatriarch();
            //create the anchor
            HSSFClientAnchor anchor;
            //anchor = new HSSFClientAnchor(0, 0, 0, 255, 2, 2, 4, 7);
            anchor = new HSSFClientAnchor(0, 0, 1, 1, 2, 2, 2, 2);
            anchor.AnchorType = 1;
            //load the picture and get the picture index in the workbook
            HSSFPicture picture = (HSSFPicture)patriarch.CreatePicture(anchor, LoadImage(@"D:\temp\login.png", hssfworkbook));
            //Reset the image to the original size.
            picture.Resize();
            picture.LineStyle = HSSFPicture.LINESTYLE_NONE;

            WriteToFile();
        }

        public static int LoadImage(string path, HSSFWorkbook wb)
        {
            FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read);
            byte[] buffer = new byte[file.Length];
            file.Read(buffer, 0, (int)file.Length);
            return wb.AddPicture(buffer, PictureType.JPEG);

        }

        void WriteToFile()
        {
            //Write the stream data of workbook to the root directory
            FileStream file = new FileStream(@"D:\temp\폴란드_GANBAN11111.xls", FileMode.Create);
            hssfworkbook.Write(file);
            file.Close();
        }

        private void load_process()
        {
            HSSFWorkbook hssfwb;
            using (FileStream file = new FileStream(@"D:\temp\폴란드_GANBAN.xls", FileMode.Open, FileAccess.Read))
            {
                hssfwb = new HSSFWorkbook(file);
            }

            Sheet sheet = hssfwb.GetSheet("Sheet1");

            


            for (int row = 0; row <= sheet.LastRowNum; row++)
            {
                if (sheet.GetRow(row) != null) //null is when the row only contains empty cells 
                {
                    MessageBox.Show(string.Format("Row {0} = {1}", row, sheet.GetRow(row).GetCell(0).StringCellValue));
                }
            }
        }
    }
}
