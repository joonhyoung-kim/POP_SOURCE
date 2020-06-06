using System.Windows.Forms;

namespace SmartMOM_POP
{
    partial class frmMainProductComplete
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
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle4 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle5 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle6 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle7 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle8 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle9 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle10 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle11 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle12 = new System.Windows.Forms.DataGridViewCellStyle();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel3 = new System.Windows.Forms.TableLayoutPanel();
            this.lblTotalQty = new System.Windows.Forms.Label();
            this.lblTotalProd = new System.Windows.Forms.Label();
            this.lblItem = new System.Windows.Forms.Label();
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
            this.label3 = new System.Windows.Forms.Label();
            this.tableLayoutPanel6 = new System.Windows.Forms.TableLayoutPanel();
            this.btnWoClose = new System.Windows.Forms.Button();
            this.lblUser = new System.Windows.Forms.Label();
            this.btnLabelPrint = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.lblBoxCount = new System.Windows.Forms.Label();
            this.btnCtReprintNewForm = new System.Windows.Forms.Button();
            this.tableLayoutPanel7 = new System.Windows.Forms.TableLayoutPanel();
            this.btnTitle = new System.Windows.Forms.Button();
            this.btnBadqty = new System.Windows.Forms.Button();
            this.btnReprint = new System.Windows.Forms.Button();
            this.btnPallet = new System.Windows.Forms.Button();
            this.btnWorker = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnWoStatus = new System.Windows.Forms.Button();
            this.btnWoStatus2 = new System.Windows.Forms.Button();
            this.tableLayoutPanel4 = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel5 = new System.Windows.Forms.TableLayoutPanel();
            this.btnGTReprint = new System.Windows.Forms.Button();
            this.btnCTReprint = new System.Windows.Forms.Button();
            this.btnCTGTReprint = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.serialButton1 = new System.IO.Ports.SerialPort();
            this.timerButtonClose = new System.Windows.Forms.Timer();
            this.serialButton2 = new System.IO.Ports.SerialPort();
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
            this.tableLayoutPanel1.AutoSize = true;
            this.tableLayoutPanel1.BackColor = System.Drawing.SystemColors.ButtonHighlight;
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
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1300, 819);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel2.ColumnCount = 2;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 75F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel2.Controls.Add(this.tableLayoutPanel3, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.tableLayoutPanel6, 1, 0);
            this.tableLayoutPanel2.Location = new System.Drawing.Point(0, 144);
            this.tableLayoutPanel2.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 1;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(1300, 675);
            this.tableLayoutPanel2.TabIndex = 1;
            // 
            // tableLayoutPanel3
            // 
            this.tableLayoutPanel3.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel3.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel3.ColumnCount = 4;
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20.52928F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 35.29287F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20.64927F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 23.52858F));
            this.tableLayoutPanel3.Controls.Add(this.lblTotalQty, 2, 8);
            this.tableLayoutPanel3.Controls.Add(this.lblTotalProd, 0, 8);
            this.tableLayoutPanel3.Controls.Add(this.lblItem, 1, 2);
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
            this.tableLayoutPanel3.Controls.Add(this.label3, 0, 0);
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
            this.tableLayoutPanel3.Size = new System.Drawing.Size(973, 673);
            this.tableLayoutPanel3.TabIndex = 0;
            // 
            // lblTotalQty
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblTotalQty, 2);
            this.lblTotalQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTotalQty.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.lblTotalQty.Location = new System.Drawing.Point(543, 594);
            this.lblTotalQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblTotalQty.Name = "lblTotalQty";
            this.lblTotalQty.Size = new System.Drawing.Size(428, 77);
            this.lblTotalQty.TabIndex = 13;
            this.lblTotalQty.Text = "3,100/4,000";
            this.lblTotalQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblTotalProd
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblTotalProd, 2);
            this.lblTotalProd.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTotalProd.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.lblTotalProd.Location = new System.Drawing.Point(2, 594);
            this.lblTotalProd.Margin = new System.Windows.Forms.Padding(1);
            this.lblTotalProd.Name = "lblTotalProd";
            this.lblTotalProd.Size = new System.Drawing.Size(538, 77);
            this.lblTotalProd.TabIndex = 12;
            this.lblTotalProd.Text = "총 생산현황";
            this.lblTotalProd.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblItem
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblItem, 3);
            this.lblItem.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItem.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblItem.Location = new System.Drawing.Point(201, 148);
            this.lblItem.Margin = new System.Windows.Forms.Padding(1);
            this.lblItem.Name = "lblItem";
            this.lblItem.Size = new System.Drawing.Size(770, 70);
            this.lblItem.TabIndex = 6;
            this.lblItem.Text = "lblItem";
            this.lblItem.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label5
            // 
            this.label5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label5.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label5.Location = new System.Drawing.Point(2, 148);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(196, 70);
            this.label5.TabIndex = 11;
            this.label5.Text = "품번";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label9
            // 
            this.label9.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label9.Font = new System.Drawing.Font("맑은 고딕", 29F, System.Drawing.FontStyle.Bold);
            this.label9.ForeColor = System.Drawing.SystemColors.ControlText;
            this.label9.Location = new System.Drawing.Point(2, 75);
            this.label9.Margin = new System.Windows.Forms.Padding(1);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(196, 70);
            this.label9.TabIndex = 11;
            this.label9.Text = "고객사제번";
            this.label9.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.label9.Click += new System.EventHandler(this.label9_Click);
            // 
            // lblProductorderid
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblProductorderid, 3);
            this.lblProductorderid.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblProductorderid.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblProductorderid.Location = new System.Drawing.Point(201, 75);
            this.lblProductorderid.Margin = new System.Windows.Forms.Padding(1);
            this.lblProductorderid.Name = "lblProductorderid";
            this.lblProductorderid.Size = new System.Drawing.Size(770, 70);
            this.lblProductorderid.TabIndex = 6;
            this.lblProductorderid.Text = "lblProductorderid";
            this.lblProductorderid.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label4
            // 
            this.label4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label4.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label4.Location = new System.Drawing.Point(2, 294);
            this.label4.Margin = new System.Windows.Forms.Padding(1);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(196, 70);
            this.label4.TabIndex = 11;
            this.label4.Text = "계획일자";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblPlandate
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblPlandate, 3);
            this.lblPlandate.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPlandate.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblPlandate.Location = new System.Drawing.Point(201, 294);
            this.lblPlandate.Margin = new System.Windows.Forms.Padding(1);
            this.lblPlandate.Name = "lblPlandate";
            this.lblPlandate.Size = new System.Drawing.Size(770, 70);
            this.lblPlandate.TabIndex = 6;
            this.lblPlandate.Text = "lblPlandate";
            this.lblPlandate.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label11
            // 
            this.label11.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label11.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label11.Location = new System.Drawing.Point(2, 221);
            this.label11.Margin = new System.Windows.Forms.Padding(1);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(196, 70);
            this.label11.TabIndex = 11;
            this.label11.Text = "품명";
            this.label11.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblItemdesc
            // 
            this.tableLayoutPanel3.SetColumnSpan(this.lblItemdesc, 3);
            this.lblItemdesc.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItemdesc.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblItemdesc.Location = new System.Drawing.Point(201, 221);
            this.lblItemdesc.Margin = new System.Windows.Forms.Padding(1);
            this.lblItemdesc.Name = "lblItemdesc";
            this.lblItemdesc.Size = new System.Drawing.Size(770, 70);
            this.lblItemdesc.TabIndex = 6;
            this.lblItemdesc.Text = "lblItemdesc";
            this.lblItemdesc.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label6
            // 
            this.label6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label6.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label6.Location = new System.Drawing.Point(2, 367);
            this.label6.Margin = new System.Windows.Forms.Padding(1);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(196, 70);
            this.label6.TabIndex = 11;
            this.label6.Text = "계획수량";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblPlanQty
            // 
            this.lblPlanQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPlanQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblPlanQty.Location = new System.Drawing.Point(201, 367);
            this.lblPlanQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblPlanQty.Name = "lblPlanQty";
            this.lblPlanQty.Size = new System.Drawing.Size(339, 70);
            this.lblPlanQty.TabIndex = 6;
            this.lblPlanQty.Text = "lblPlanQty";
            this.lblPlanQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label12
            // 
            this.label12.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label12.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label12.Location = new System.Drawing.Point(2, 440);
            this.label12.Margin = new System.Windows.Forms.Padding(1);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(196, 70);
            this.label12.TabIndex = 11;
            this.label12.Text = "양품수량";
            this.label12.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblGoodQty
            // 
            this.lblGoodQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblGoodQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblGoodQty.Location = new System.Drawing.Point(201, 440);
            this.lblGoodQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblGoodQty.Name = "lblGoodQty";
            this.lblGoodQty.Size = new System.Drawing.Size(339, 70);
            this.lblGoodQty.TabIndex = 6;
            this.lblGoodQty.Text = "lblGoodQty";
            this.lblGoodQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label7
            // 
            this.label7.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label7.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label7.Location = new System.Drawing.Point(543, 367);
            this.label7.Margin = new System.Windows.Forms.Padding(1);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(197, 70);
            this.label7.TabIndex = 11;
            this.label7.Text = "불량수량";
            this.label7.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblBadQty
            // 
            this.lblBadQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblBadQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblBadQty.Location = new System.Drawing.Point(743, 367);
            this.lblBadQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblBadQty.Name = "lblBadQty";
            this.lblBadQty.Size = new System.Drawing.Size(228, 70);
            this.lblBadQty.TabIndex = 6;
            this.lblBadQty.Text = "lblBadQty";
            this.lblBadQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label13
            // 
            this.label13.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label13.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label13.Location = new System.Drawing.Point(543, 440);
            this.label13.Margin = new System.Windows.Forms.Padding(1);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(197, 70);
            this.label13.TabIndex = 11;
            this.label13.Text = "취소수량";
            this.label13.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblCancelQty
            // 
            this.lblCancelQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblCancelQty.Font = new System.Drawing.Font("맑은 고딕", 27F, System.Drawing.FontStyle.Bold);
            this.lblCancelQty.Location = new System.Drawing.Point(743, 440);
            this.lblCancelQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblCancelQty.Name = "lblCancelQty";
            this.lblCancelQty.Size = new System.Drawing.Size(228, 70);
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
            this.lblLine.Location = new System.Drawing.Point(2, 513);
            this.lblLine.Margin = new System.Windows.Forms.Padding(1);
            this.lblLine.Name = "lblLine";
            this.lblLine.Size = new System.Drawing.Size(196, 78);
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
            this.txtSN.Location = new System.Drawing.Point(200, 512);
            this.txtSN.Margin = new System.Windows.Forms.Padding(0);
            this.txtSN.Name = "txtSN";
            this.txtSN.Size = new System.Drawing.Size(772, 80);
            this.txtSN.TabIndex = 5;
            this.txtSN.Text = "A0000456789";
            this.txtSN.MouseClick += new System.Windows.Forms.MouseEventHandler(this.txtSN_MouseClick);
            this.txtSN.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtSN_KeyDown);
            this.txtSN.Leave += new System.EventHandler(this.txtSN_Leave);
            // 
            // label10
            // 
            this.label10.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label10.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label10.Location = new System.Drawing.Point(543, 2);
            this.label10.Margin = new System.Windows.Forms.Padding(1);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(197, 70);
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
            this.lblMakelotqty.Location = new System.Drawing.Point(743, 2);
            this.lblMakelotqty.Margin = new System.Windows.Forms.Padding(1);
            this.lblMakelotqty.Name = "lblMakelotqty";
            this.lblMakelotqty.Size = new System.Drawing.Size(228, 70);
            this.lblMakelotqty.TabIndex = 6;
            this.lblMakelotqty.Text = "0";
            this.lblMakelotqty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblMakelotqty.Click += new System.EventHandler(this.lblMakelotqty_Click);
            // 
            // btnPOSearch
            // 
            this.btnPOSearch.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnPOSearch.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnPOSearch.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPOSearch.Font = new System.Drawing.Font("맑은 고딕", 28F, System.Drawing.FontStyle.Bold);
            this.btnPOSearch.ForeColor = System.Drawing.Color.Black;
            this.btnPOSearch.Location = new System.Drawing.Point(200, 1);
            this.btnPOSearch.Margin = new System.Windows.Forms.Padding(0);
            this.btnPOSearch.Name = "btnPOSearch";
            this.btnPOSearch.Size = new System.Drawing.Size(341, 72);
            this.btnPOSearch.TabIndex = 0;
            this.btnPOSearch.Text = "선택";
            this.btnPOSearch.UseVisualStyleBackColor = false;
            this.btnPOSearch.Click += new System.EventHandler(this.btnPOSearch_Click);
            // 
            // label3
            // 
            this.label3.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label3.Font = new System.Drawing.Font("맑은 고딕", 29.25F, System.Drawing.FontStyle.Bold);
            this.label3.Location = new System.Drawing.Point(2, 2);
            this.label3.Margin = new System.Windows.Forms.Padding(1);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(196, 70);
            this.label3.TabIndex = 11;
            this.label3.Text = "작업지시";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.label3.Click += new System.EventHandler(this.label3_Click);
            // 
            // tableLayoutPanel6
            // 
            this.tableLayoutPanel6.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel6.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel6.ColumnCount = 1;
            this.tableLayoutPanel6.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel6.Controls.Add(this.btnWoClose, 0, 4);
            this.tableLayoutPanel6.Controls.Add(this.lblUser, 0, 0);
            this.tableLayoutPanel6.Controls.Add(this.btnLabelPrint, 0, 1);
            this.tableLayoutPanel6.Controls.Add(this.label2, 0, 2);
            this.tableLayoutPanel6.Controls.Add(this.lblBoxCount, 0, 3);
            this.tableLayoutPanel6.Controls.Add(this.btnCtReprintNewForm, 0, 6);
            this.tableLayoutPanel6.Location = new System.Drawing.Point(978, 3);
            this.tableLayoutPanel6.Name = "tableLayoutPanel6";
            this.tableLayoutPanel6.RowCount = 7;
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 180F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 177F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 78F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 140F));
            this.tableLayoutPanel6.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel6.Size = new System.Drawing.Size(319, 669);
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
            this.btnWoClose.Size = new System.Drawing.Size(317, 219);
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
            this.lblUser.Size = new System.Drawing.Size(315, 71);
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
            this.btnLabelPrint.Size = new System.Drawing.Size(317, 180);
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
            this.label2.Size = new System.Drawing.Size(315, 71);
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
            this.lblBoxCount.Size = new System.Drawing.Size(315, 175);
            this.lblBoxCount.TabIndex = 6;
            this.lblBoxCount.Text = "1 / 5";
            this.lblBoxCount.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
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
            this.btnCtReprintNewForm.Size = new System.Drawing.Size(317, 1);
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
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 23.83178F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 13.60981F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 15.59579F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 9.754673F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 10.45561F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 1F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 11.03327F));
            this.tableLayoutPanel7.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 213F));
            this.tableLayoutPanel7.Controls.Add(this.btnTitle, 0, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnBadqty, 4, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnReprint, 2, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnPallet, 3, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnWorker, 1, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnClose, 8, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnWoStatus, 7, 0);
            this.tableLayoutPanel7.Controls.Add(this.btnWoStatus2, 5, 0);
            this.tableLayoutPanel7.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel7.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel7.Name = "tableLayoutPanel7";
            this.tableLayoutPanel7.RowCount = 1;
            this.tableLayoutPanel7.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel7.Size = new System.Drawing.Size(1300, 144);
            this.tableLayoutPanel7.TabIndex = 4;
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
            this.btnTitle.Size = new System.Drawing.Size(170, 144);
            this.btnTitle.TabIndex = 0;
            this.btnTitle.Text = "조립완성라인(MAIN01)";
            this.btnTitle.UseVisualStyleBackColor = false;
            this.btnTitle.Click += new System.EventHandler(this.btnTitle_Click);
            // 
            // btnBadqty
            // 
            this.btnBadqty.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnBadqty.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.btnBadqty.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnBadqty.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBadqty.ForeColor = System.Drawing.Color.Yellow;
            this.btnBadqty.Location = new System.Drawing.Point(744, 0);
            this.btnBadqty.Margin = new System.Windows.Forms.Padding(0);
            this.btnBadqty.Name = "btnBadqty";
            this.btnBadqty.Size = new System.Drawing.Size(105, 144);
            this.btnBadqty.TabIndex = 1;
            this.btnBadqty.Text = "불량등록";
            this.btnBadqty.UseVisualStyleBackColor = false;
            this.btnBadqty.Click += new System.EventHandler(this.btnBadqty_Click);
            // 
            // btnReprint
            // 
            this.btnReprint.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnReprint.BackColor = System.Drawing.Color.DarkRed;
            this.btnReprint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnReprint.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnReprint.ForeColor = System.Drawing.Color.White;
            this.btnReprint.Location = new System.Drawing.Point(428, 0);
            this.btnReprint.Margin = new System.Windows.Forms.Padding(0);
            this.btnReprint.Name = "btnReprint";
            this.btnReprint.Size = new System.Drawing.Size(147, 144);
            this.btnReprint.TabIndex = 2;
            this.btnReprint.Text = "직전\r\n박스라벨\r\n재발행";
            this.btnReprint.UseVisualStyleBackColor = false;
            this.btnReprint.Click += new System.EventHandler(this.btnReprint_Click);
            // 
            // btnPallet
            // 
            this.btnPallet.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnPallet.BackColor = System.Drawing.Color.DarkRed;
            this.btnPallet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPallet.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPallet.ForeColor = System.Drawing.Color.White;
            this.btnPallet.Location = new System.Drawing.Point(575, 0);
            this.btnPallet.Margin = new System.Windows.Forms.Padding(0);
            this.btnPallet.Name = "btnPallet";
            this.btnPallet.Size = new System.Drawing.Size(169, 144);
            this.btnPallet.TabIndex = 0;
            this.btnPallet.Text = "Pallet라벨\r\n출력";
            this.btnPallet.UseVisualStyleBackColor = false;
            this.btnPallet.Click += new System.EventHandler(this.btnPallet_Click);
            // 
            // btnWorker
            // 
            this.btnWorker.AllowDrop = true;
            this.btnWorker.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnWorker.AutoSize = true;
            this.btnWorker.BackColor = System.Drawing.Color.DarkRed;
            this.btnWorker.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnWorker.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnWorker.ForeColor = System.Drawing.Color.White;
            this.btnWorker.ImageAlign = System.Drawing.ContentAlignment.TopCenter;
            this.btnWorker.Location = new System.Drawing.Point(170, 0);
            this.btnWorker.Margin = new System.Windows.Forms.Padding(0);
            this.btnWorker.Name = "btnWorker";
            this.btnWorker.Size = new System.Drawing.Size(258, 144);
            this.btnWorker.TabIndex = 0;
            this.btnWorker.Text = "투입인원\r\n(1명)\r\n";
            this.btnWorker.UseVisualStyleBackColor = false;
            this.btnWorker.Click += new System.EventHandler(this.btnWorker_Click);
            // 
            // btnClose
            // 
            this.btnClose.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.btnClose.ForeColor = System.Drawing.Color.Black;
            this.btnClose.Location = new System.Drawing.Point(1089, 0);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(203, 144);
            this.btnClose.TabIndex = 1;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnWoStatus
            // 
            this.btnWoStatus.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnWoStatus.BackColor = System.Drawing.Color.DarkRed;
            this.btnWoStatus.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnWoStatus.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnWoStatus.ForeColor = System.Drawing.Color.White;
            this.btnWoStatus.Location = new System.Drawing.Point(963, 0);
            this.btnWoStatus.Margin = new System.Windows.Forms.Padding(0);
            this.btnWoStatus.Name = "btnWoStatus";
            this.btnWoStatus.Size = new System.Drawing.Size(119, 144);
            this.btnWoStatus.TabIndex = 3;
            this.btnWoStatus.Text = "작업현황";
            this.btnWoStatus.UseVisualStyleBackColor = false;
            this.btnWoStatus.Click += new System.EventHandler(this.btnWoStatus_Click);
            // 
            // btnWoStatus2
            // 
            this.btnWoStatus2.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnWoStatus2.BackColor = System.Drawing.Color.DarkRed;
            this.btnWoStatus2.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnWoStatus2.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnWoStatus2.ForeColor = System.Drawing.Color.White;
            this.btnWoStatus2.Location = new System.Drawing.Point(849, 0);
            this.btnWoStatus2.Margin = new System.Windows.Forms.Padding(0);
            this.btnWoStatus2.Name = "btnWoStatus2";
            this.btnWoStatus2.Size = new System.Drawing.Size(113, 143);
            this.btnWoStatus2.TabIndex = 3;
            this.btnWoStatus2.Text = "작업현황2";
            this.btnWoStatus2.UseVisualStyleBackColor = false;
            this.btnWoStatus2.Click += new System.EventHandler(this.btnWoStatus2_Click);
            // 
            // tableLayoutPanel4
            // 
            this.tableLayoutPanel4.Anchor = System.Windows.Forms.AnchorStyles.None;
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
            this.tableLayoutPanel4.Location = new System.Drawing.Point(11, 820);
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
            this.tableLayoutPanel5.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel5.ColumnCount = 2;
            this.tableLayoutPanel5.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel5.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel5.Controls.Add(this.btnGTReprint, 0, 0);
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
            this.tblMain.Size = new System.Drawing.Size(1300, 820);
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
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCT.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.grdCT.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdCT.Data = null;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdCT.DefaultCellStyle = dataGridViewCellStyle2;
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
            dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle3.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle3.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCT.RowHeadersDefaultCellStyle = dataGridViewCellStyle3;
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
            dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGT.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle4;
            this.grdGT.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdGT.Data = null;
            dataGridViewCellStyle5.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle5.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle5.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle5.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle5.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle5.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdGT.DefaultCellStyle = dataGridViewCellStyle5;
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
            dataGridViewCellStyle6.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle6.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle6.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle6.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle6.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGT.RowHeadersDefaultCellStyle = dataGridViewCellStyle6;
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
            dataGridViewCellStyle7.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle7.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle7.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle7.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle7.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle7.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle7.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCTDetail.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle7;
            this.grdCTDetail.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdCTDetail.Data = null;
            dataGridViewCellStyle8.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle8.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle8.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle8.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle8.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle8.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle8.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdCTDetail.DefaultCellStyle = dataGridViewCellStyle8;
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
            dataGridViewCellStyle9.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle9.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle9.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle9.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle9.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle9.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle9.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdCTDetail.RowHeadersDefaultCellStyle = dataGridViewCellStyle9;
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
            dataGridViewCellStyle10.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle10.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle10.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle10.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle10.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle10.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle10.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdBad.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle10;
            this.grdBad.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdBad.Data = null;
            dataGridViewCellStyle11.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle11.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle11.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle11.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle11.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle11.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle11.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdBad.DefaultCellStyle = dataGridViewCellStyle11;
            this.grdBad.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdBad.EnableHeadersVisualStyles = false;
            this.grdBad.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdBad.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdBad.LanguageCategory = null;
            this.grdBad.LanguageCode = null;
            this.grdBad.Location = new System.Drawing.Point(1036, 126);
            this.grdBad.Name = "grdBad";
            this.grdBad.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle12.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle12.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle12.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle12.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle12.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle12.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle12.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdBad.RowHeadersDefaultCellStyle = dataGridViewCellStyle12;
            this.grdBad.RowHeadersVisible = false;
            this.grdBad.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdBad.RowTemplate.Height = 23;
            this.grdBad.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdBad.Size = new System.Drawing.Size(1, 1);
            this.grdBad.TabIndex = 1;
            // 
            // frmMainProductComplete
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1300, 820);
            this.Controls.Add(this.tblMain);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmMainProductComplete";
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
            this.tableLayoutPanel7.PerformLayout();
            this.tableLayoutPanel4.ResumeLayout(false);
            this.tableLayoutPanel5.ResumeLayout(false);
            this.tblMain.ResumeLayout(false);
            this.tblMain.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdCT)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdGT)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdCTDetail)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.grdBad)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
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
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel7;
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
        private System.Windows.Forms.Button btnWoStatus;
        private System.Windows.Forms.Button btnWoStatus2;
    }
}