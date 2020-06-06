using System.Windows.Forms;

namespace SmartMOM_POP
{
    partial class frmMainProductCompleteAD
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle13 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle14 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle15 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle16 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle17 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle18 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle19 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle20 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle21 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle22 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle23 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle24 = new System.Windows.Forms.DataGridViewCellStyle();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel3 = new System.Windows.Forms.TableLayoutPanel();
            this.lblTotalQty = new System.Windows.Forms.Label();
            this.lblTotalProd = new System.Windows.Forms.Label();
            this.lblItem = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.lblProductorderid = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.lblPlandate = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.lblItemdesc = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.lblPlanQty = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.lblGoodQty = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.lblBadQty = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.lblCancelQty = new System.Windows.Forms.Label();
            this.lblLine = new System.Windows.Forms.Label();
            this.txtSN = new System.Windows.Forms.TextBox();
            this.label10 = new System.Windows.Forms.Label();
            this.lblMakelotqty = new System.Windows.Forms.Label();
            this.btnPOSearch = new System.Windows.Forms.Button();
            this.tableLayoutPanel6 = new System.Windows.Forms.TableLayoutPanel();
            this.btnWoClose = new System.Windows.Forms.Button();
            this.lblUser = new System.Windows.Forms.Label();
            this.btnLabelPrint = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.lblBoxCount = new System.Windows.Forms.Label();
            this.btnCtReprintNewForm = new System.Windows.Forms.Button();
            this.tableLayoutPanel7 = new System.Windows.Forms.TableLayoutPanel();
            this.btnReprint = new System.Windows.Forms.Button();
            this.btnTitle = new System.Windows.Forms.Button();
            this.btnWorker = new System.Windows.Forms.Button();
            this.btnWoStatus = new System.Windows.Forms.Button();
            this.btnBadqty = new System.Windows.Forms.Button();
            this.buttonPrintCls = new System.Windows.Forms.Button();
            this.btnPallet = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.DF = new System.Windows.Forms.Button();
            this.tableLayoutPanel4 = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel5 = new System.Windows.Forms.TableLayoutPanel();
            this.btnGTReprint = new System.Windows.Forms.Button();
            this.btnCTReprint = new System.Windows.Forms.Button();
            this.btnCTGTReprint = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.serialButton1 = new System.IO.Ports.SerialPort(this.components);
            this.timerButtonClose = new System.Windows.Forms.Timer(this.components);
            this.serialButton2 = new System.IO.Ports.SerialPort(this.components);
            this.tblMain = new System.Windows.Forms.TableLayoutPanel();
            this.grdCT = new SmartMom_Lib.ExGrid();
            this.grdGT = new SmartMom_Lib.ExGrid();
            this.grdCTDetail = new SmartMom_Lib.ExGrid();
            this.grdBad = new SmartMom_Lib.ExGrid();
            this.tableLayoutPanel1.SuspendLayout();
            this.tableLayoutPanel2.SuspendLayout();
            this.tableLayoutPanel3.SuspendLayout();
            this.tableLayoutPanel6.SuspendLayout();
            this.tableLayoutPanel7.SuspendLayout();
            this.tableLayoutPanel4.SuspendLayout();
            this.tableLayoutPanel5.SuspendLayout();
            this.tblMain.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdCT)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdGT)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdCTDetail)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdBad)).BeginInit();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel2, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel7, 0, 0);
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 2;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 144F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1920, 1079);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.ColumnCount = 2;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 75F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel2.Controls.Add(this.tableLayoutPanel3, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.tableLayoutPanel6, 1, 0);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(0, 144);
            this.tableLayoutPanel2.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 1;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(1920, 935);
            this.tableLayoutPanel2.TabIndex = 1;
            // 
            // tableLayoutPanel3
            // 
            this.tableLayoutPanel3.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel3.ColumnCount = 4;
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20.52928F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 35.29287F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20.64927F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 23.52858F));
            this.tableLayoutPanel3.Controls.Add(this.lblTotalQty, 2, 8);
            this.tableLayoutPanel3.Controls.Add(this.lblTotalProd, 0, 8);
            this.tableLayoutPanel3.Controls.Add(this.lblItem, 1, 2);
            this.tableLayoutPanel3.Controls.Add(this.label3, 0, 0);
            this.tableLayoutPanel3.Controls.Add(this.label5, 0, 2);
            this.tableLayoutPanel3.Controls.Add(this.label9, 0, 1);
            this.tableLayoutPanel3.Controls.Add(this.lblProductorderid, 1, 1);
            this.tableLayoutPanel3.Controls.Add(this.label4, 0, 4);
            this.tableLayoutPanel3.Controls.Add(this.lblPlandate, 1, 4);
            this.tableLayoutPanel3.Controls.Add(this.label11, 0, 3);
            this.tableLayoutPanel3.Controls.Add(this.lblItemdesc, 1, 3);
            this.tableLayoutPanel3.Controls.Add(this.label6, 0, 5);
            this.tableLayoutPanel3.Controls.Add(this.lblPlanQty, 1, 5);
            this.tableLayoutPanel3.Controls.Add(this.label12, 0, 6);
            this.tableLayoutPanel3.Controls.Add(this.lblGoodQty, 1, 6);
            this.tableLayoutPanel3.Controls.Add(this.label7, 2, 5);
            this.tableLayoutPanel3.Controls.Add(this.lblBadQty, 3, 5);
            this.tableLayoutPanel3.Controls.Add(this.label13, 2, 6);
            this.tableLayoutPanel3.Controls.Add(this.lblCancelQty, 3, 6);
            this.tableLayoutPanel3.Controls.Add(this.lblLine, 0, 7);
            this.tableLayoutPanel3.Controls.Add(this.txtSN, 1, 7);
            this.tableLayoutPanel3.Controls.Add(this.label10, 2, 0);
            this.tableLayoutPanel3.Controls.Add(this.lblMakelotqty, 3, 0);
            this.tableLayoutPanel3.Controls.Add(this.btnPOSearch, 1, 0);
            this.tableLayoutPanel3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel3.Location = new System.Drawing.Point(1, 1);
            this.tableLayoutPanel3.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel3.Name = "tableLayoutPanel3";
            this.tableLayoutPanel3.RowCount = 9;
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.49953F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.49953F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.49953F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.49953F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.49953F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.49953F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.49953F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 80F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 12.50328F));
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel3.Size = new System.Drawing.Size(1438, 933);
            this.tableLayoutPanel3.TabIndex = 0;
            // 
            // lblTotalQty
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblTotalQty, 2);
            this.lblTotalQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTotalQty.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.lblTotalQty.Location = new System.Drawing.Point(803, 825);
            this.lblTotalQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblTotalQty.Name = "lblTotalQty";
            this.lblTotalQty.Size = new System.Drawing.Size(633, 106);
            this.lblTotalQty.TabIndex = 13;
            this.lblTotalQty.Text = "3,100/4,000";
            this.lblTotalQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblTotalProd
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblTotalProd, 2);
            this.lblTotalProd.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTotalProd.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.lblTotalProd.Location = new System.Drawing.Point(2, 825);
            this.lblTotalProd.Margin = new System.Windows.Forms.Padding(1);
            this.lblTotalProd.Name = "lblTotalProd";
            this.lblTotalProd.Size = new System.Drawing.Size(798, 106);
            this.lblTotalProd.TabIndex = 12;
            this.lblTotalProd.Text = "총 생산현황";
            this.lblTotalProd.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblItem
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblItem, 3);
            this.lblItem.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItem.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblItem.Location = new System.Drawing.Point(297, 214);
            this.lblItem.Margin = new System.Windows.Forms.Padding(1);
            this.lblItem.Name = "lblItem";
            this.lblItem.Size = new System.Drawing.Size(1139, 103);
            this.lblItem.TabIndex = 6;
            this.lblItem.Text = "lblItem";
            this.lblItem.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label3
            // 
            this.label3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label3.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label3.Location = new System.Drawing.Point(2, 2);
            this.label3.Margin = new System.Windows.Forms.Padding(1);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(292, 103);
            this.label3.TabIndex = 11;
            this.label3.Text = "작업지시";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label5
            // 
            this.label5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label5.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label5.Location = new System.Drawing.Point(2, 214);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(292, 103);
            this.label5.TabIndex = 11;
            this.label5.Text = "품번";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label9
            // 
            this.label9.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label9.Font = new System.Drawing.Font("맑은 고딕", 29F, System.Drawing.FontStyle.Bold);
            this.label9.ForeColor = System.Drawing.SystemColors.ControlText;
            this.label9.Location = new System.Drawing.Point(2, 108);
            this.label9.Margin = new System.Windows.Forms.Padding(1);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(292, 103);
            this.label9.TabIndex = 11;
            this.label9.Text = "고객사제번";
            this.label9.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblProductorderid
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblProductorderid, 3);
            this.lblProductorderid.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblProductorderid.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblProductorderid.Location = new System.Drawing.Point(297, 108);
            this.lblProductorderid.Margin = new System.Windows.Forms.Padding(1);
            this.lblProductorderid.Name = "lblProductorderid";
            this.lblProductorderid.Size = new System.Drawing.Size(1139, 103);
            this.lblProductorderid.TabIndex = 6;
            this.lblProductorderid.Text = "lblProductorderid";
            this.lblProductorderid.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.lblProductorderid.Click += new System.EventHandler(this.lblProductorderid_Click);
            // 
            // label4
            // 
            this.label4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label4.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label4.Location = new System.Drawing.Point(2, 426);
            this.label4.Margin = new System.Windows.Forms.Padding(1);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(292, 103);
            this.label4.TabIndex = 11;
            this.label4.Text = "계획일자";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblPlandate
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblPlandate, 3);
            this.lblPlandate.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPlandate.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblPlandate.Location = new System.Drawing.Point(297, 426);
            this.lblPlandate.Margin = new System.Windows.Forms.Padding(1);
            this.lblPlandate.Name = "lblPlandate";
            this.lblPlandate.Size = new System.Drawing.Size(1139, 103);
            this.lblPlandate.TabIndex = 6;
            this.lblPlandate.Text = "lblPlandate";
            this.lblPlandate.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label11
            // 
            this.label11.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label11.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label11.Location = new System.Drawing.Point(2, 320);
            this.label11.Margin = new System.Windows.Forms.Padding(1);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(292, 103);
            this.label11.TabIndex = 11;
            this.label11.Text = "품명";
            this.label11.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblItemdesc
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblItemdesc, 3);
            this.lblItemdesc.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItemdesc.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblItemdesc.Location = new System.Drawing.Point(297, 320);
            this.lblItemdesc.Margin = new System.Windows.Forms.Padding(1);
            this.lblItemdesc.Name = "lblItemdesc";
            this.lblItemdesc.Size = new System.Drawing.Size(1139, 103);
            this.lblItemdesc.TabIndex = 6;
            this.lblItemdesc.Text = "lblItemdesc";
            this.lblItemdesc.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label6
            // 
            this.label6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label6.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label6.Location = new System.Drawing.Point(2, 532);
            this.label6.Margin = new System.Windows.Forms.Padding(1);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(292, 103);
            this.label6.TabIndex = 11;
            this.label6.Text = "계획수량";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblPlanQty
            // 
            this.lblPlanQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPlanQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblPlanQty.Location = new System.Drawing.Point(297, 532);
            this.lblPlanQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblPlanQty.Name = "lblPlanQty";
            this.lblPlanQty.Size = new System.Drawing.Size(503, 103);
            this.lblPlanQty.TabIndex = 6;
            this.lblPlanQty.Text = "lblPlanQty";
            this.lblPlanQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label12
            // 
            this.label12.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label12.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label12.Location = new System.Drawing.Point(2, 638);
            this.label12.Margin = new System.Windows.Forms.Padding(1);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(292, 103);
            this.label12.TabIndex = 11;
            this.label12.Text = "양품수량";
            this.label12.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblGoodQty
            // 
            this.lblGoodQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblGoodQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblGoodQty.Location = new System.Drawing.Point(297, 638);
            this.lblGoodQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblGoodQty.Name = "lblGoodQty";
            this.lblGoodQty.Size = new System.Drawing.Size(503, 103);
            this.lblGoodQty.TabIndex = 6;
            this.lblGoodQty.Text = "lblGoodQty";
            this.lblGoodQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label7
            // 
            this.label7.AllowDrop = true;
            this.label7.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label7.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label7.Location = new System.Drawing.Point(803, 532);
            this.label7.Margin = new System.Windows.Forms.Padding(1);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(293, 103);
            this.label7.TabIndex = 11;
            this.label7.Text = "불량수량";
            this.label7.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblBadQty
            // 
            this.lblBadQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblBadQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblBadQty.Location = new System.Drawing.Point(1099, 532);
            this.lblBadQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblBadQty.Name = "lblBadQty";
            this.lblBadQty.Size = new System.Drawing.Size(337, 103);
            this.lblBadQty.TabIndex = 6;
            this.lblBadQty.Text = "lblBadQty";
            this.lblBadQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label13
            // 
            this.label13.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label13.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label13.Location = new System.Drawing.Point(803, 638);
            this.label13.Margin = new System.Windows.Forms.Padding(1);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(293, 103);
            this.label13.TabIndex = 11;
            this.label13.Text = "취소수량";
            this.label13.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblCancelQty
            // 
            this.lblCancelQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblCancelQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblCancelQty.Location = new System.Drawing.Point(1099, 638);
            this.lblCancelQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblCancelQty.Name = "lblCancelQty";
            this.lblCancelQty.Size = new System.Drawing.Size(337, 103);
            this.lblCancelQty.TabIndex = 6;
            this.lblCancelQty.Text = "lblCancelQty";
            this.lblCancelQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblLine
            // 
            this.lblLine.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.lblLine.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblLine.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblLine.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.lblLine.Font = new System.Drawing.Font("맑은 고딕", 45F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblLine.Location = new System.Drawing.Point(2, 744);
            this.lblLine.Margin = new System.Windows.Forms.Padding(1);
            this.lblLine.Name = "lblLine";
            this.lblLine.Size = new System.Drawing.Size(292, 78);
            this.lblLine.TabIndex = 11;
            this.lblLine.Text = "SET";
            this.lblLine.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblLine.Click += new System.EventHandler(this.lblLine_Click);
            // 
            // txtSN
            // 
            this.txtSN.BackColor = System.Drawing.Color.Red;
            this.txtSN.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtSN.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.tableLayoutPanel3.SetColumnSpan(this.txtSN, 3);
            this.txtSN.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtSN.Font = new System.Drawing.Font("맑은 고딕", 45F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.txtSN.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.txtSN.Location = new System.Drawing.Point(296, 743);
            this.txtSN.Margin = new System.Windows.Forms.Padding(0);
            this.txtSN.Name = "txtSN";
            this.txtSN.Size = new System.Drawing.Size(1141, 80);
            this.txtSN.TabIndex = 5;
            this.txtSN.Text = "A0000456789";
            this.txtSN.MouseClick += new System.Windows.Forms.MouseEventHandler(this.txtSN_MouseClick);
            this.txtSN.TextChanged += new System.EventHandler(this.txtSN_TextChanged);
            this.txtSN.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtSN_KeyDown);
            this.txtSN.Leave += new System.EventHandler(this.txtSN_Leave);
            // 
            // label10
            // 
            this.label10.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label10.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label10.Location = new System.Drawing.Point(803, 2);
            this.label10.Margin = new System.Windows.Forms.Padding(1);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(293, 103);
            this.label10.TabIndex = 11;
            this.label10.Text = "입력수량";
            this.label10.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblMakelotqty
            // 
            this.lblMakelotqty.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.lblMakelotqty.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblMakelotqty.Cursor = System.Windows.Forms.Cursors.Hand;
            this.lblMakelotqty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblMakelotqty.Font = new System.Drawing.Font("맑은 고딕", 28F, System.Drawing.FontStyle.Bold);
            this.lblMakelotqty.Location = new System.Drawing.Point(1099, 2);
            this.lblMakelotqty.Margin = new System.Windows.Forms.Padding(1);
            this.lblMakelotqty.Name = "lblMakelotqty";
            this.lblMakelotqty.Size = new System.Drawing.Size(337, 103);
            this.lblMakelotqty.TabIndex = 6;
            this.lblMakelotqty.Text = "0";
            this.lblMakelotqty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblMakelotqty.Click += new System.EventHandler(this.lblMakelotqty_Click);
            // 
            // btnPOSearch
            // 
            this.btnPOSearch.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnPOSearch.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPOSearch.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPOSearch.Font = new System.Drawing.Font("맑은 고딕", 28F, System.Drawing.FontStyle.Bold);
            this.btnPOSearch.ForeColor = System.Drawing.Color.Black;
            this.btnPOSearch.Location = new System.Drawing.Point(296, 1);
            this.btnPOSearch.Margin = new System.Windows.Forms.Padding(0);
            this.btnPOSearch.Name = "btnPOSearch";
            this.btnPOSearch.Size = new System.Drawing.Size(505, 105);
            this.btnPOSearch.TabIndex = 0;
            this.btnPOSearch.Text = "선택";
            this.btnPOSearch.UseVisualStyleBackColor = false;
            this.btnPOSearch.Click += new System.EventHandler(this.btnPOSearch_Click);
            // 
            // tableLayoutPanel6
            // 
            this.tableLayoutPanel6.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel6.ColumnCount = 1;
            this.tableLayoutPanel6.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel6.Controls.Add(this.btnWoClose, 0, 4);
            this.tableLayoutPanel6.Controls.Add(this.lblUser, 0, 0);
            this.tableLayoutPanel6.Controls.Add(this.btnLabelPrint, 0, 1);
            this.tableLayoutPanel6.Controls.Add(this.label2, 0, 2);
            this.tableLayoutPanel6.Controls.Add(this.lblBoxCount, 0, 3);
            this.tableLayoutPanel6.Controls.Add(this.btnCtReprintNewForm, 0, 6);
            this.tableLayoutPanel6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel6.Location = new System.Drawing.Point(1443, 3);
            this.tableLayoutPanel6.Name = "tableLayoutPanel6";
            this.tableLayoutPanel6.RowCount = 7;
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 180F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 177F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 78F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 140F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel6.Size = new System.Drawing.Size(474, 929);
            this.tableLayoutPanel6.TabIndex = 1;
            // 
            // btnWoClose
            // 
            this.btnWoClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnWoClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnWoClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnWoClose.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.btnWoClose.ForeColor = System.Drawing.Color.Black;
            this.btnWoClose.Location = new System.Drawing.Point(1, 508);
            this.btnWoClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnWoClose.Name = "btnWoClose";
            this.tableLayoutPanel6.SetRowSpan(this.btnWoClose, 2);
            this.btnWoClose.Size = new System.Drawing.Size(472, 219);
            this.btnWoClose.TabIndex = 12;
            this.btnWoClose.Text = "작업지시마감";
            this.btnWoClose.UseVisualStyleBackColor = false;
            this.btnWoClose.Click += new System.EventHandler(this.btnWoClose_Click);
            // 
            // lblUser
            // 
            this.lblUser.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblUser.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.lblUser.Location = new System.Drawing.Point(2, 2);
            this.lblUser.Margin = new System.Windows.Forms.Padding(1);
            this.lblUser.Name = "lblUser";
            this.lblUser.Size = new System.Drawing.Size(470, 71);
            this.lblUser.TabIndex = 6;
            this.lblUser.Text = "작업자";
            this.lblUser.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblUser.Click += new System.EventHandler(this.lblUser_Click);
            // 
            // btnLabelPrint
            // 
            this.btnLabelPrint.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnLabelPrint.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnLabelPrint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnLabelPrint.Font = new System.Drawing.Font("맑은 고딕", 29.75F, System.Drawing.FontStyle.Bold);
            this.btnLabelPrint.ForeColor = System.Drawing.Color.Black;
            this.btnLabelPrint.Location = new System.Drawing.Point(1, 75);
            this.btnLabelPrint.Margin = new System.Windows.Forms.Padding(0);
            this.btnLabelPrint.Name = "btnLabelPrint";
            this.btnLabelPrint.Size = new System.Drawing.Size(472, 180);
            this.btnLabelPrint.TabIndex = 1;
            this.btnLabelPrint.Text = "실적입력";
            this.btnLabelPrint.UseVisualStyleBackColor = false;
            this.btnLabelPrint.Click += new System.EventHandler(this.btnLabelPrint_Click);
            // 
            // label2
            // 
            this.label2.BackColor = System.Drawing.Color.Silver;
            this.label2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label2.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label2.ForeColor = System.Drawing.Color.Black;
            this.label2.Location = new System.Drawing.Point(2, 257);
            this.label2.Margin = new System.Windows.Forms.Padding(1);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(470, 71);
            this.label2.TabIndex = 11;
            this.label2.Text = "박스생산현황";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblBoxCount
            // 
            this.lblBoxCount.BackColor = System.Drawing.Color.Silver;
            this.lblBoxCount.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblBoxCount.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblBoxCount.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblBoxCount.ForeColor = System.Drawing.Color.Black;
            this.lblBoxCount.Location = new System.Drawing.Point(2, 331);
            this.lblBoxCount.Margin = new System.Windows.Forms.Padding(1);
            this.lblBoxCount.Name = "lblBoxCount";
            this.lblBoxCount.Size = new System.Drawing.Size(470, 175);
            this.lblBoxCount.TabIndex = 6;
            this.lblBoxCount.Text = "1 / 5";
            this.lblBoxCount.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblBoxCount.Click += new System.EventHandler(this.lblBoxCount_Click);
            // 
            // btnCtReprintNewForm
            // 
            this.btnCtReprintNewForm.BackColor = System.Drawing.Color.Silver;
            this.btnCtReprintNewForm.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnCtReprintNewForm.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnCtReprintNewForm.Font = new System.Drawing.Font("맑은 고딕", 28F, System.Drawing.FontStyle.Bold);
            this.btnCtReprintNewForm.ForeColor = System.Drawing.Color.Black;
            this.btnCtReprintNewForm.Location = new System.Drawing.Point(1, 728);
            this.btnCtReprintNewForm.Margin = new System.Windows.Forms.Padding(0);
            this.btnCtReprintNewForm.Name = "btnCtReprintNewForm";
            this.btnCtReprintNewForm.Size = new System.Drawing.Size(472, 200);
            this.btnCtReprintNewForm.TabIndex = 1;
            this.btnCtReprintNewForm.Text = "박스라벨 재발행";
            this.btnCtReprintNewForm.UseVisualStyleBackColor = false;
            this.btnCtReprintNewForm.Click += new System.EventHandler(this.btnCtReprintNewForm_Click);
            // 
            // tableLayoutPanel7
            // 
            this.tableLayoutPanel7.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel7.ColumnCount = 9;
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 15.73027F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 14.04449F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 14.04449F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 14.04449F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 13.67476F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 14.41394F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 1F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 14.04449F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 242F));
            this.tableLayoutPanel7.Controls.Add(this.btnReprint, 2, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnTitle, 0, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnWorker, 1, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnWoStatus, 1, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnBadqty, 5, 0);
            this.tableLayoutPanel7.Controls.Add(this.buttonPrintCls, 7, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnPallet, 4, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnClose, 8, 0);
            this.tableLayoutPanel7.Location = new System.Drawing.Point(2, 0);
            this.tableLayoutPanel7.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel7.Name = "tableLayoutPanel7";
            this.tableLayoutPanel7.RowCount = 1;
            this.tableLayoutPanel7.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel7.Size = new System.Drawing.Size(1916, 144);
            this.tableLayoutPanel7.TabIndex = 4;
            // 
            // btnReprint
            // 
            this.btnReprint.BackColor = System.Drawing.Color.DarkRed;
            this.btnReprint.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnReprint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnReprint.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnReprint.ForeColor = System.Drawing.Color.White;
            this.btnReprint.Location = new System.Drawing.Point(731, 0);
            this.btnReprint.Margin = new System.Windows.Forms.Padding(0);
            this.btnReprint.Name = "btnReprint";
            this.btnReprint.Size = new System.Drawing.Size(234, 144);
            this.btnReprint.TabIndex = 2;
            this.btnReprint.Text = "직전\r\n박스라벨\r\n재발행";
            this.btnReprint.UseVisualStyleBackColor = false;
            this.btnReprint.Click += new System.EventHandler(this.btnReprint_Click);
            // 
            // btnTitle
            // 
            this.btnTitle.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.btnTitle.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnTitle.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnTitle.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnTitle.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.btnTitle.Location = new System.Drawing.Point(0, 0);
            this.btnTitle.Margin = new System.Windows.Forms.Padding(0);
            this.btnTitle.Name = "btnTitle";
            this.btnTitle.Size = new System.Drawing.Size(263, 144);
            this.btnTitle.TabIndex = 0;
            this.btnTitle.Text = "조립완성라인(MAIN01)";
            this.btnTitle.UseVisualStyleBackColor = false;
            this.btnTitle.Click += new System.EventHandler(this.btnTitle_Click);
            // 
            // btnWorker
            // 
            this.btnWorker.BackColor = System.Drawing.Color.DarkRed;
            this.btnWorker.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnWorker.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnWorker.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnWorker.ForeColor = System.Drawing.Color.White;
            this.btnWorker.Location = new System.Drawing.Point(263, 0);
            this.btnWorker.Margin = new System.Windows.Forms.Padding(0);
            this.btnWorker.Name = "btnWorker";
            this.btnWorker.Size = new System.Drawing.Size(234, 144);
            this.btnWorker.TabIndex = 0;
            this.btnWorker.Text = "투입인원\r\n(1명)\r\n";
            this.btnWorker.UseVisualStyleBackColor = false;
            this.btnWorker.Click += new System.EventHandler(this.btnWorker_Click);
            // 
            // btnWoStatus
            // 
            this.btnWoStatus.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnWoStatus.BackColor = System.Drawing.Color.DarkRed;
            this.btnWoStatus.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnWoStatus.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnWoStatus.ForeColor = System.Drawing.Color.White;
            this.btnWoStatus.Location = new System.Drawing.Point(497, 0);
            this.btnWoStatus.Margin = new System.Windows.Forms.Padding(0);
            this.btnWoStatus.Name = "btnWoStatus";
            this.btnWoStatus.Size = new System.Drawing.Size(234, 144);
            this.btnWoStatus.TabIndex = 4;
            this.btnWoStatus.Text = "작업현황";
            this.btnWoStatus.UseVisualStyleBackColor = false;
            this.btnWoStatus.Click += new System.EventHandler(this.button1_Click);
            // 
            // btnBadqty
            // 
            this.btnBadqty.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnBadqty.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.btnBadqty.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnBadqty.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBadqty.ForeColor = System.Drawing.Color.Yellow;
            this.btnBadqty.Location = new System.Drawing.Point(1193, 0);
            this.btnBadqty.Margin = new System.Windows.Forms.Padding(0);
            this.btnBadqty.Name = "btnBadqty";
            this.btnBadqty.Size = new System.Drawing.Size(241, 144);
            this.btnBadqty.TabIndex = 1;
            this.btnBadqty.Text = "불량등록";
            this.btnBadqty.UseVisualStyleBackColor = false;
            this.btnBadqty.Click += new System.EventHandler(this.btnBadqty_Click);
            // 
            // buttonPrintCls
            // 
            this.buttonPrintCls.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.buttonPrintCls.BackColor = System.Drawing.Color.Orange;
            this.buttonPrintCls.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.buttonPrintCls.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.buttonPrintCls.ForeColor = System.Drawing.Color.Transparent;
            this.buttonPrintCls.Location = new System.Drawing.Point(1435, 0);
            this.buttonPrintCls.Margin = new System.Windows.Forms.Padding(0);
            this.buttonPrintCls.Name = "buttonPrintCls";
            this.buttonPrintCls.Size = new System.Drawing.Size(234, 144);
            this.buttonPrintCls.TabIndex = 5;
            this.buttonPrintCls.Text = "초기화";
            this.buttonPrintCls.UseVisualStyleBackColor = false;
            this.buttonPrintCls.Click += new System.EventHandler(this.buttonPrintCls_Click);
            // 
            // btnPallet
            // 
            this.btnPallet.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnPallet.BackColor = System.Drawing.Color.DarkRed;
            this.btnPallet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPallet.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPallet.ForeColor = System.Drawing.Color.White;
            this.btnPallet.Location = new System.Drawing.Point(965, 0);
            this.btnPallet.Margin = new System.Windows.Forms.Padding(0);
            this.btnPallet.Name = "btnPallet";
            this.btnPallet.Size = new System.Drawing.Size(228, 144);
            this.btnPallet.TabIndex = 0;
            this.btnPallet.Text = "Pallet라벨\r\n출력";
            this.btnPallet.UseVisualStyleBackColor = false;
            this.btnPallet.Click += new System.EventHandler(this.btnPallet_Click);
            // 
            // btnClose
            // 
            this.btnClose.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnClose.ForeColor = System.Drawing.Color.Black;
            this.btnClose.Location = new System.Drawing.Point(1669, 0);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(246, 144);
            this.btnClose.TabIndex = 1;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // DF
            // 
            this.DF.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.DF.BackColor = System.Drawing.Color.DarkRed;
            this.DF.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.DF.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.DF.ForeColor = System.Drawing.Color.White;
            this.DF.Location = new System.Drawing.Point(1438, 0);
            this.DF.Margin = new System.Windows.Forms.Padding(0);
            this.DF.Name = "DF";
            this.DF.Size = new System.Drawing.Size(1, 144);
            this.DF.TabIndex = 3;
            this.DF.Text = "작업현황";
            this.DF.UseVisualStyleBackColor = false;
            this.DF.Click += new System.EventHandler(this.btnWoStatus_Click);
            // 
            // tableLayoutPanel4
            // 
            this.tableLayoutPanel4.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel4.ColumnCount = 4;
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25.00062F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25.00062F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25.00062F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 24.99813F));
            this.tableLayoutPanel4.Controls.Add(this.tableLayoutPanel5, 0, 0);
            this.tableLayoutPanel4.Controls.Add(this.btnCTReprint, 1, 0);
            this.tableLayoutPanel4.Controls.Add(this.btnCTGTReprint, 2, 0);
            this.tableLayoutPanel4.Controls.Add(this.label1, 3, 0);
            this.tableLayoutPanel4.Location = new System.Drawing.Point(1, 1080);
            this.tableLayoutPanel4.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel4.Name = "tableLayoutPanel4";
            this.tableLayoutPanel4.RowCount = 2;
            this.tableLayoutPanel4.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 121F));
            this.tableLayoutPanel4.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel4.Size = new System.Drawing.Size(1278, 1);
            this.tableLayoutPanel4.TabIndex = 3;
            this.tableLayoutPanel4.Visible = false;
            // 
            // tableLayoutPanel5
            // 
            this.tableLayoutPanel5.ColumnCount = 2;
            this.tableLayoutPanel5.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel5.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel5.Controls.Add(this.btnGTReprint, 0, 0);
            this.tableLayoutPanel5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel5.Location = new System.Drawing.Point(1, 1);
            this.tableLayoutPanel5.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel5.Name = "tableLayoutPanel5";
            this.tableLayoutPanel5.RowCount = 1;
            this.tableLayoutPanel5.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel5.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 121F));
            this.tableLayoutPanel5.Size = new System.Drawing.Size(318, 121);
            this.tableLayoutPanel5.TabIndex = 0;
            // 
            // btnGTReprint
            // 
            this.btnGTReprint.Location = new System.Drawing.Point(3, 3);
            this.btnGTReprint.Name = "btnGTReprint";
            this.btnGTReprint.Size = new System.Drawing.Size(75, 23);
            this.btnGTReprint.TabIndex = 0;
            // 
            // btnCTReprint
            // 
            this.btnCTReprint.Location = new System.Drawing.Point(323, 4);
            this.btnCTReprint.Name = "btnCTReprint";
            this.btnCTReprint.Size = new System.Drawing.Size(75, 23);
            this.btnCTReprint.TabIndex = 1;
            // 
            // btnCTGTReprint
            // 
            this.btnCTGTReprint.Location = new System.Drawing.Point(642, 4);
            this.btnCTGTReprint.Name = "btnCTGTReprint";
            this.btnCTGTReprint.Size = new System.Drawing.Size(75, 23);
            this.btnCTGTReprint.TabIndex = 2;
            // 
            // label1
            // 
            this.label1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label1.ForeColor = System.Drawing.Color.Yellow;
            this.label1.Location = new System.Drawing.Point(959, 2);
            this.label1.Margin = new System.Windows.Forms.Padding(1);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(317, 119);
            this.label1.TabIndex = 6;
            this.label1.Text = "불량리스트(visible false)";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // timerButtonClose
            // 
            this.timerButtonClose.Interval = 10;
            this.timerButtonClose.Tick += new System.EventHandler(this.timerButtonClose_Tick);
            // 
            // tblMain
            // 
            this.tblMain.ColumnCount = 1;
            this.tblMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tblMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tblMain.Controls.Add(this.tableLayoutPanel4, 0, 1);
            this.tblMain.Controls.Add(this.tableLayoutPanel1, 0, 0);
            this.tblMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tblMain.Location = new System.Drawing.Point(0, 0);
            this.tblMain.Margin = new System.Windows.Forms.Padding(0);
            this.tblMain.Name = "tblMain";
            this.tblMain.RowCount = 2;
            this.tblMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tblMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 1F));
            this.tblMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tblMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 1F));
            this.tblMain.Size = new System.Drawing.Size(1920, 1080);
            this.tblMain.TabIndex = 4;
            // 
            // grdCT
            // 
            this.grdCT.AllowUserToAddRows = false;
            this.grdCT.AllowUserToResizeRows = false;
            this.grdCT.BackgroundColor = System.Drawing.Color.Silver;
            this.grdCT.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdCT.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdCT.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle13.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle13.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle13.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle13.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle13.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle13.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle13.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCT.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle13;
            this.grdCT.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdCT.Data = null;
            dataGridViewCellStyle14.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle14.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle14.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle14.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle14.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle14.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle14.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdCT.DefaultCellStyle = dataGridViewCellStyle14;
            this.grdCT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdCT.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdCT.EnableHeadersVisualStyles = false;
            this.grdCT.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdCT.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdCT.LanguageCategory = null;
            this.grdCT.LanguageCode = null;
            this.grdCT.Location = new System.Drawing.Point(348, 126);
            this.grdCT.Name = "grdCT";
            this.grdCT.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle15.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle15.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle15.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle15.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle15.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle15.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle15.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCT.RowHeadersDefaultCellStyle = dataGridViewCellStyle15;
            this.grdCT.RowHeadersVisible = false;
            this.grdCT.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdCT.RowTemplate.Height = 23;
            this.grdCT.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdCT.Size = new System.Drawing.Size(337, 1);
            this.grdCT.TabIndex = 1;
            // 
            // grdGT
            // 
            this.grdGT.AllowUserToAddRows = false;
            this.grdGT.AllowUserToResizeRows = false;
            this.grdGT.BackgroundColor = System.Drawing.Color.Silver;
            this.grdGT.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdGT.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdGT.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle16.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle16.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle16.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle16.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle16.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle16.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle16.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGT.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle16;
            this.grdGT.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdGT.Data = null;
            dataGridViewCellStyle17.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle17.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle17.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle17.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle17.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle17.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle17.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdGT.DefaultCellStyle = dataGridViewCellStyle17;
            this.grdGT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdGT.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdGT.EnableHeadersVisualStyles = false;
            this.grdGT.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdGT.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdGT.LanguageCategory = null;
            this.grdGT.LanguageCode = null;
            this.grdGT.Location = new System.Drawing.Point(4, 126);
            this.grdGT.Name = "grdGT";
            this.grdGT.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle18.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle18.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle18.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle18.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle18.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle18.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle18.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGT.RowHeadersDefaultCellStyle = dataGridViewCellStyle18;
            this.grdGT.RowHeadersVisible = false;
            this.grdGT.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdGT.RowTemplate.Height = 23;
            this.grdGT.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdGT.Size = new System.Drawing.Size(337, 1);
            this.grdGT.TabIndex = 1;
            // 
            // grdCTDetail
            // 
            this.grdCTDetail.AllowUserToAddRows = false;
            this.grdCTDetail.AllowUserToResizeRows = false;
            this.grdCTDetail.BackgroundColor = System.Drawing.Color.Silver;
            this.grdCTDetail.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdCTDetail.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdCTDetail.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle19.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle19.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle19.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle19.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle19.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle19.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle19.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCTDetail.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle19;
            this.grdCTDetail.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdCTDetail.Data = null;
            dataGridViewCellStyle20.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle20.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle20.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle20.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle20.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle20.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle20.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdCTDetail.DefaultCellStyle = dataGridViewCellStyle20;
            this.grdCTDetail.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdCTDetail.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdCTDetail.EnableHeadersVisualStyles = false;
            this.grdCTDetail.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdCTDetail.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdCTDetail.LanguageCategory = null;
            this.grdCTDetail.LanguageCode = null;
            this.grdCTDetail.Location = new System.Drawing.Point(692, 126);
            this.grdCTDetail.Name = "grdCTDetail";
            this.grdCTDetail.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle21.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle21.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle21.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle21.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle21.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle21.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle21.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCTDetail.RowHeadersDefaultCellStyle = dataGridViewCellStyle21;
            this.grdCTDetail.RowHeadersVisible = false;
            this.grdCTDetail.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdCTDetail.RowTemplate.Height = 23;
            this.grdCTDetail.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdCTDetail.Size = new System.Drawing.Size(337, 1);
            this.grdCTDetail.TabIndex = 1;
            // 
            // grdBad
            // 
            this.grdBad.AllowUserToAddRows = false;
            this.grdBad.AllowUserToResizeRows = false;
            this.grdBad.BackgroundColor = System.Drawing.Color.Silver;
            this.grdBad.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdBad.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdBad.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle22.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle22.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle22.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle22.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle22.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle22.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle22.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdBad.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle22;
            this.grdBad.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdBad.Data = null;
            dataGridViewCellStyle23.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle23.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle23.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle23.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle23.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle23.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle23.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdBad.DefaultCellStyle = dataGridViewCellStyle23;
            this.grdBad.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdBad.EnableHeadersVisualStyles = false;
            this.grdBad.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdBad.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdBad.LanguageCategory = null;
            this.grdBad.LanguageCode = null;
            this.grdBad.Location = new System.Drawing.Point(1036, 126);
            this.grdBad.Name = "grdBad";
            this.grdBad.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle24.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle24.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle24.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle24.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle24.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle24.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle24.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdBad.RowHeadersDefaultCellStyle = dataGridViewCellStyle24;
            this.grdBad.RowHeadersVisible = false;
            this.grdBad.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdBad.RowTemplate.Height = 23;
            this.grdBad.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdBad.Size = new System.Drawing.Size(1, 1);
            this.grdBad.TabIndex = 1;
            // 
            // frmMainProductCompleteAD
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1920, 1080);
            this.Controls.Add(this.tblMain);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmMainProductCompleteAD";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "조립완성라인";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.frmMainProductComplete_FormClosed);
            this.Load += new System.EventHandler(this.frmMainProductLine_Load);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tableLayoutPanel3.ResumeLayout(false);
            this.tableLayoutPanel3.PerformLayout();
            this.tableLayoutPanel6.ResumeLayout(false);
            this.tableLayoutPanel7.ResumeLayout(false);
            this.tableLayoutPanel4.ResumeLayout(false);
            this.tableLayoutPanel5.ResumeLayout(false);
            this.tblMain.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.grdCT)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdGT)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdCTDetail)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdBad)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Button btnTitle;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel3;
        private System.Windows.Forms.Button btnPOSearch;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel4;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel5;
        private System.Windows.Forms.Button btnGTReprint;
        private System.Windows.Forms.Button btnWorker;
        private SmartMom_Lib.ExGrid grdGT;
        private System.Windows.Forms.TextBox txtSN;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Label lblPlandate;
        private System.Windows.Forms.Label lblItem;
        private System.Windows.Forms.Label lblItemdesc;
        private System.Windows.Forms.Label lblPlanQty;
        private System.Windows.Forms.Label lblGoodQty;
        private System.Windows.Forms.Label lblBadQty;
        private System.Windows.Forms.Label lblProductorderid;
        private System.Windows.Forms.Label lblUser;
        private System.Windows.Forms.Label lblBoxCount;
        private System.Windows.Forms.Label lblMakelotqty;
        private System.Windows.Forms.Button btnBadqty;
        private System.IO.Ports.SerialPort serialButton1;
        private System.Windows.Forms.Timer timerButtonClose;
        private System.Windows.Forms.Label lblLine;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Button btnCTReprint;
        private System.Windows.Forms.Button btnCTGTReprint;
        private SmartMom_Lib.ExGrid grdCT;
        private SmartMom_Lib.ExGrid grdCTDetail;
        private System.Windows.Forms.Label label1;
        private SmartMom_Lib.ExGrid grdBad;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel6;
        private System.Windows.Forms.Label label2;
        private System.IO.Ports.SerialPort serialButton2;
        private System.Windows.Forms.TableLayoutPanel tblMain;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label lblCancelQty;
        private System.Windows.Forms.Button btnPallet;
        private System.Windows.Forms.Button btnCtReprintNewForm;
        private System.Windows.Forms.Button btnLabelPrint;
        private System.Windows.Forms.Button btnReprint;
        private System.Windows.Forms.Button btnWoClose;
        private System.Windows.Forms.Label lblTotalQty;
        private System.Windows.Forms.Label lblTotalProd;
        private System.Windows.Forms.Button DF;
        private Button btnWoStatus;
        private Button buttonPrintCls;
        public TableLayoutPanel tableLayoutPanel1;
        public TableLayoutPanel tableLayoutPanel7;
    }
}