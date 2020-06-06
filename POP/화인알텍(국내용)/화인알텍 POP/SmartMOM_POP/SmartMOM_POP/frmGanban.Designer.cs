namespace SmartMOM_POP
{
    partial class frmGanban
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
            this.btnLabelPrint = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnGanbandelete = new System.Windows.Forms.Button();
            this.btnGanbanSet = new System.Windows.Forms.Button();
            this.btnAutoLabelPrint = new System.Windows.Forms.Button();
            this.btnSet = new System.Windows.Forms.Button();
            this.txtSN = new System.Windows.Forms.TextBox();
            this.lblDepartureGID = new System.Windows.Forms.Label();
            this.lblPallet = new System.Windows.Forms.Label();
            this.lblCT = new System.Windows.Forms.Label();
            this.lblAllQty = new System.Windows.Forms.Label();
            this.btnInit = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.label1 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.lblStock = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.lblVendorNm = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.lblLabelID = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.lblGanbanQty = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.lblCtQty = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.lblPossibleQty = new System.Windows.Forms.Label();
            this.comboItem = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.bntReprint = new System.Windows.Forms.Button();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.grdGanban = new SmartMom_Lib.ExGrid();
            this.panel1.SuspendLayout();
            this.tableLayoutPanel2.SuspendLayout();
            this.tableLayoutPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdGanban)).BeginInit();
            this.SuspendLayout();
            // 
            // btnLabelPrint
            // 
            this.btnLabelPrint.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnLabelPrint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnLabelPrint.Font = new System.Drawing.Font("굴림", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnLabelPrint.ForeColor = System.Drawing.Color.Black;
            this.btnLabelPrint.Location = new System.Drawing.Point(286, 17);
            this.btnLabelPrint.Margin = new System.Windows.Forms.Padding(0);
            this.btnLabelPrint.Name = "btnLabelPrint";
            this.btnLabelPrint.Size = new System.Drawing.Size(342, 93);
            this.btnLabelPrint.TabIndex = 2;
            this.btnLabelPrint.Text = "수동 간판 생성 && 발행";
            this.btnLabelPrint.UseVisualStyleBackColor = false;
            this.btnLabelPrint.Click += new System.EventHandler(this.btnLabelPrint_Click);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.btnGanbandelete);
            this.panel1.Controls.Add(this.btnGanbanSet);
            this.panel1.Controls.Add(this.btnAutoLabelPrint);
            this.panel1.Controls.Add(this.btnLabelPrint);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 799);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1280, 225);
            this.panel1.TabIndex = 3;
            // 
            // btnGanbandelete
            // 
            this.btnGanbandelete.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnGanbandelete.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGanbandelete.Font = new System.Drawing.Font("굴림", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnGanbandelete.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.btnGanbandelete.Location = new System.Drawing.Point(640, 17);
            this.btnGanbandelete.Margin = new System.Windows.Forms.Padding(0);
            this.btnGanbandelete.Name = "btnGanbandelete";
            this.btnGanbandelete.Size = new System.Drawing.Size(331, 196);
            this.btnGanbandelete.TabIndex = 3;
            this.btnGanbandelete.Text = "간판라벨삭제";
            this.btnGanbandelete.UseVisualStyleBackColor = false;
            this.btnGanbandelete.Visible = false;
            this.btnGanbandelete.Click += new System.EventHandler(this.btnGanbandelete_Click);
            // 
            // btnGanbanSet
            // 
            this.btnGanbanSet.BackColor = System.Drawing.Color.Gray;
            this.btnGanbanSet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGanbanSet.Font = new System.Drawing.Font("굴림", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnGanbanSet.ForeColor = System.Drawing.Color.Black;
            this.btnGanbanSet.Location = new System.Drawing.Point(7, 17);
            this.btnGanbanSet.Margin = new System.Windows.Forms.Padding(0);
            this.btnGanbanSet.Name = "btnGanbanSet";
            this.btnGanbanSet.Size = new System.Drawing.Size(266, 93);
            this.btnGanbanSet.TabIndex = 2;
            this.btnGanbanSet.Text = "간반구성 : 0";
            this.btnGanbanSet.UseVisualStyleBackColor = false;
            this.btnGanbanSet.Click += new System.EventHandler(this.btnGanbanSet_Click);
            // 
            // btnAutoLabelPrint
            // 
            this.btnAutoLabelPrint.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnAutoLabelPrint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnAutoLabelPrint.Font = new System.Drawing.Font("굴림", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnAutoLabelPrint.ForeColor = System.Drawing.Color.Black;
            this.btnAutoLabelPrint.Location = new System.Drawing.Point(7, 120);
            this.btnAutoLabelPrint.Margin = new System.Windows.Forms.Padding(0);
            this.btnAutoLabelPrint.Name = "btnAutoLabelPrint";
            this.btnAutoLabelPrint.Size = new System.Drawing.Size(621, 93);
            this.btnAutoLabelPrint.TabIndex = 2;
            this.btnAutoLabelPrint.Text = "자동 간판 생성 && 발행(박스구성수량 기준)";
            this.btnAutoLabelPrint.UseVisualStyleBackColor = false;
            this.btnAutoLabelPrint.Click += new System.EventHandler(this.btnAutoLabelPrint_Click);
            // 
            // btnSet
            // 
            this.btnSet.BackColor = System.Drawing.Color.Silver;
            this.btnSet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSet.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnSet.ForeColor = System.Drawing.Color.Red;
            this.btnSet.Location = new System.Drawing.Point(1, 316);
            this.btnSet.Margin = new System.Windows.Forms.Padding(0);
            this.btnSet.Name = "btnSet";
            this.btnSet.Size = new System.Drawing.Size(180, 67);
            this.btnSet.TabIndex = 2;
            this.btnSet.Text = "Set";
            this.btnSet.UseVisualStyleBackColor = false;
            this.btnSet.Click += new System.EventHandler(this.btnSet_Click);
            // 
            // txtSN
            // 
            this.txtSN.BackColor = System.Drawing.Color.Red;
            this.txtSN.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtSN.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.tableLayoutPanel2.SetColumnSpan(this.txtSN, 6);
            this.txtSN.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtSN.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.txtSN.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.txtSN.Location = new System.Drawing.Point(183, 317);
            this.txtSN.Margin = new System.Windows.Forms.Padding(1);
            this.txtSN.Name = "txtSN";
            this.txtSN.Size = new System.Drawing.Size(1093, 64);
            this.txtSN.TabIndex = 6;
            this.txtSN.MouseClick += new System.Windows.Forms.MouseEventHandler(this.txtSN_MouseClick);
            this.txtSN.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtSN_KeyDown);
            this.txtSN.Leave += new System.EventHandler(this.txtSN_Leave);
            // 
            // lblDepartureGID
            // 
            this.lblDepartureGID.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblDepartureGID, 2);
            this.lblDepartureGID.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblDepartureGID.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblDepartureGID.Location = new System.Drawing.Point(183, 2);
            this.lblDepartureGID.Margin = new System.Windows.Forms.Padding(1);
            this.lblDepartureGID.Name = "lblDepartureGID";
            this.lblDepartureGID.Size = new System.Drawing.Size(359, 58);
            this.lblDepartureGID.TabIndex = 8;
            this.lblDepartureGID.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblPallet
            // 
            this.lblPallet.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblPallet, 2);
            this.lblPallet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPallet.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblPallet.Location = new System.Drawing.Point(726, 2);
            this.lblPallet.Margin = new System.Windows.Forms.Padding(1);
            this.lblPallet.Name = "lblPallet";
            this.lblPallet.Size = new System.Drawing.Size(359, 58);
            this.lblPallet.TabIndex = 8;
            this.lblPallet.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblCT
            // 
            this.lblCT.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblCT, 2);
            this.lblCT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblCT.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblCT.Location = new System.Drawing.Point(726, 63);
            this.lblCT.Margin = new System.Windows.Forms.Padding(1);
            this.lblCT.Name = "lblCT";
            this.lblCT.Size = new System.Drawing.Size(359, 58);
            this.lblCT.TabIndex = 8;
            this.lblCT.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblAllQty
            // 
            this.lblAllQty.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblAllQty, 2);
            this.lblAllQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblAllQty.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblAllQty.Location = new System.Drawing.Point(726, 124);
            this.lblAllQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblAllQty.Name = "lblAllQty";
            this.lblAllQty.Size = new System.Drawing.Size(359, 58);
            this.lblAllQty.TabIndex = 8;
            this.lblAllQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnInit
            // 
            this.btnInit.BackColor = System.Drawing.Color.Silver;
            this.btnInit.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnInit.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnInit.Font = new System.Drawing.Font("맑은 고딕", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnInit.ForeColor = System.Drawing.Color.Black;
            this.btnInit.Location = new System.Drawing.Point(1087, 123);
            this.btnInit.Margin = new System.Windows.Forms.Padding(0);
            this.btnInit.Name = "btnInit";
            this.tableLayoutPanel2.SetRowSpan(this.btnInit, 2);
            this.btnInit.Size = new System.Drawing.Size(190, 126);
            this.btnInit.TabIndex = 2;
            this.btnInit.Text = "화면 초기화";
            this.btnInit.UseVisualStyleBackColor = false;
            this.btnInit.Click += new System.EventHandler(this.btnInit_Click);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.Silver;
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.Red;
            this.btnClose.Location = new System.Drawing.Point(1087, 250);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(190, 65);
            this.btnClose.TabIndex = 2;
            this.btnClose.Text = "닫기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel2.ColumnCount = 7;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.66667F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 185F));
            this.tableLayoutPanel2.Controls.Add(this.btnSet, 0, 5);
            this.tableLayoutPanel2.Controls.Add(this.txtSN, 1, 5);
            this.tableLayoutPanel2.Controls.Add(this.lblDepartureGID, 1, 0);
            this.tableLayoutPanel2.Controls.Add(this.label1, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.label4, 0, 3);
            this.tableLayoutPanel2.Controls.Add(this.lblStock, 1, 3);
            this.tableLayoutPanel2.Controls.Add(this.label2, 0, 1);
            this.tableLayoutPanel2.Controls.Add(this.lblVendorNm, 1, 1);
            this.tableLayoutPanel2.Controls.Add(this.label11, 0, 2);
            this.tableLayoutPanel2.Controls.Add(this.lblLabelID, 1, 2);
            this.tableLayoutPanel2.Controls.Add(this.label9, 0, 4);
            this.tableLayoutPanel2.Controls.Add(this.lblGanbanQty, 1, 4);
            this.tableLayoutPanel2.Controls.Add(this.label8, 2, 4);
            this.tableLayoutPanel2.Controls.Add(this.lblCtQty, 3, 4);
            this.tableLayoutPanel2.Controls.Add(this.label10, 4, 4);
            this.tableLayoutPanel2.Controls.Add(this.lblPossibleQty, 5, 4);
            this.tableLayoutPanel2.Controls.Add(this.comboItem, 4, 3);
            this.tableLayoutPanel2.Controls.Add(this.lblAllQty, 4, 2);
            this.tableLayoutPanel2.Controls.Add(this.lblCT, 4, 1);
            this.tableLayoutPanel2.Controls.Add(this.lblPallet, 4, 0);
            this.tableLayoutPanel2.Controls.Add(this.label3, 3, 0);
            this.tableLayoutPanel2.Controls.Add(this.label5, 3, 1);
            this.tableLayoutPanel2.Controls.Add(this.label6, 3, 2);
            this.tableLayoutPanel2.Controls.Add(this.label7, 3, 3);
            this.tableLayoutPanel2.Controls.Add(this.bntReprint, 6, 0);
            this.tableLayoutPanel2.Controls.Add(this.btnInit, 6, 2);
            this.tableLayoutPanel2.Controls.Add(this.btnClose, 6, 4);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(1, 1);
            this.tableLayoutPanel2.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 6;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 65F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 65F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 55F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(1278, 384);
            this.tableLayoutPanel2.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label1.Location = new System.Drawing.Point(2, 2);
            this.label1.Margin = new System.Windows.Forms.Padding(1);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(178, 58);
            this.label1.TabIndex = 12;
            this.label1.Text = "출발처리번호";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label4
            // 
            this.label4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label4.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label4.Location = new System.Drawing.Point(2, 185);
            this.label4.Margin = new System.Windows.Forms.Padding(1);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(178, 63);
            this.label4.TabIndex = 12;
            this.label4.Text = "창고명";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblStock
            // 
            this.lblStock.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblStock, 2);
            this.lblStock.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblStock.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblStock.Location = new System.Drawing.Point(183, 185);
            this.lblStock.Margin = new System.Windows.Forms.Padding(1);
            this.lblStock.Name = "lblStock";
            this.lblStock.Size = new System.Drawing.Size(359, 63);
            this.lblStock.TabIndex = 8;
            this.lblStock.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label2
            // 
            this.label2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label2.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label2.Location = new System.Drawing.Point(2, 63);
            this.label2.Margin = new System.Windows.Forms.Padding(1);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(178, 58);
            this.label2.TabIndex = 12;
            this.label2.Text = "납품번호";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblVendorNm
            // 
            this.lblVendorNm.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblVendorNm, 2);
            this.lblVendorNm.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblVendorNm.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblVendorNm.Location = new System.Drawing.Point(183, 63);
            this.lblVendorNm.Margin = new System.Windows.Forms.Padding(1);
            this.lblVendorNm.Name = "lblVendorNm";
            this.lblVendorNm.Size = new System.Drawing.Size(359, 58);
            this.lblVendorNm.TabIndex = 8;
            this.lblVendorNm.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label11
            // 
            this.label11.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label11.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label11.Location = new System.Drawing.Point(2, 124);
            this.label11.Margin = new System.Windows.Forms.Padding(1);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(178, 58);
            this.label11.TabIndex = 12;
            this.label11.Text = "라벨ID";
            this.label11.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblLabelID
            // 
            this.lblLabelID.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblLabelID, 2);
            this.lblLabelID.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblLabelID.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblLabelID.Location = new System.Drawing.Point(183, 124);
            this.lblLabelID.Margin = new System.Windows.Forms.Padding(1);
            this.lblLabelID.Name = "lblLabelID";
            this.lblLabelID.Size = new System.Drawing.Size(359, 58);
            this.lblLabelID.TabIndex = 8;
            this.lblLabelID.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label9
            // 
            this.label9.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label9.Font = new System.Drawing.Font("굴림", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label9.ForeColor = System.Drawing.Color.DarkRed;
            this.label9.Location = new System.Drawing.Point(2, 251);
            this.label9.Margin = new System.Windows.Forms.Padding(1);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(178, 63);
            this.label9.TabIndex = 12;
            this.label9.Text = "간판구성수량";
            this.label9.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblGanbanQty
            // 
            this.lblGanbanQty.BackColor = System.Drawing.Color.Gainsboro;
            this.lblGanbanQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblGanbanQty.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblGanbanQty.Location = new System.Drawing.Point(183, 251);
            this.lblGanbanQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblGanbanQty.Name = "lblGanbanQty";
            this.lblGanbanQty.Size = new System.Drawing.Size(178, 63);
            this.lblGanbanQty.TabIndex = 8;
            this.lblGanbanQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label8
            // 
            this.label8.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label8.Font = new System.Drawing.Font("굴림", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label8.ForeColor = System.Drawing.Color.DarkRed;
            this.label8.Location = new System.Drawing.Point(364, 251);
            this.label8.Margin = new System.Windows.Forms.Padding(1);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(178, 63);
            this.label8.TabIndex = 12;
            this.label8.Text = "박스구성수량";
            this.label8.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblCtQty
            // 
            this.lblCtQty.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.lblCtQty.Cursor = System.Windows.Forms.Cursors.Hand;
            this.lblCtQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblCtQty.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblCtQty.Location = new System.Drawing.Point(545, 251);
            this.lblCtQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblCtQty.Name = "lblCtQty";
            this.lblCtQty.Size = new System.Drawing.Size(178, 63);
            this.lblCtQty.TabIndex = 8;
            this.lblCtQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblCtQty.Click += new System.EventHandler(this.lblCtQty_Click);
            // 
            // label10
            // 
            this.label10.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label10.Font = new System.Drawing.Font("굴림", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label10.ForeColor = System.Drawing.Color.DarkRed;
            this.label10.Location = new System.Drawing.Point(726, 251);
            this.label10.Margin = new System.Windows.Forms.Padding(1);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(178, 63);
            this.label10.TabIndex = 12;
            this.label10.Text = "간판생성가능수량";
            this.label10.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblPossibleQty
            // 
            this.lblPossibleQty.BackColor = System.Drawing.Color.Gainsboro;
            this.lblPossibleQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPossibleQty.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblPossibleQty.Location = new System.Drawing.Point(907, 251);
            this.lblPossibleQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblPossibleQty.Name = "lblPossibleQty";
            this.lblPossibleQty.Size = new System.Drawing.Size(178, 63);
            this.lblPossibleQty.TabIndex = 8;
            this.lblPossibleQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // comboItem
            // 
            this.tableLayoutPanel2.SetColumnSpan(this.comboItem, 2);
            this.comboItem.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboItem.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboItem.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboItem.FormattingEnabled = true;
            this.comboItem.Location = new System.Drawing.Point(726, 186);
            this.comboItem.Margin = new System.Windows.Forms.Padding(1, 2, 1, 2);
            this.comboItem.Name = "comboItem";
            this.comboItem.Size = new System.Drawing.Size(359, 62);
            this.comboItem.TabIndex = 9;
            // 
            // label3
            // 
            this.label3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label3.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label3.Location = new System.Drawing.Point(545, 2);
            this.label3.Margin = new System.Windows.Forms.Padding(1);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(178, 58);
            this.label3.TabIndex = 12;
            this.label3.Text = "파레트번호";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label5
            // 
            this.label5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label5.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label5.Location = new System.Drawing.Point(545, 63);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(178, 58);
            this.label5.TabIndex = 12;
            this.label5.Text = "박스포장번호";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label6
            // 
            this.label6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label6.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label6.Location = new System.Drawing.Point(545, 124);
            this.label6.Margin = new System.Windows.Forms.Padding(1);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(178, 58);
            this.label6.TabIndex = 12;
            this.label6.Text = "총수량(Lot Size)";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label7
            // 
            this.label7.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label7.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label7.Location = new System.Drawing.Point(545, 185);
            this.label7.Margin = new System.Windows.Forms.Padding(1);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(178, 63);
            this.label7.TabIndex = 12;
            this.label7.Text = "품명";
            this.label7.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // bntReprint
            // 
            this.bntReprint.BackColor = System.Drawing.Color.Silver;
            this.bntReprint.Dock = System.Windows.Forms.DockStyle.Fill;
            this.bntReprint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.bntReprint.Font = new System.Drawing.Font("맑은 고딕", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.bntReprint.ForeColor = System.Drawing.Color.Black;
            this.bntReprint.Location = new System.Drawing.Point(1087, 1);
            this.bntReprint.Margin = new System.Windows.Forms.Padding(0);
            this.bntReprint.Name = "bntReprint";
            this.tableLayoutPanel2.SetRowSpan(this.bntReprint, 2);
            this.bntReprint.Size = new System.Drawing.Size(190, 121);
            this.bntReprint.TabIndex = 2;
            this.bntReprint.Text = "간판 재발행";
            this.bntReprint.UseVisualStyleBackColor = false;
            this.bntReprint.Click += new System.EventHandler(this.bntReprint_Click);
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.grdGanban, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel2, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 2);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 386F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 225F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1280, 1024);
            this.tableLayoutPanel1.TabIndex = 1;
            // 
            // grdGanban
            // 
            this.grdGanban.AllowUserToAddRows = false;
            this.grdGanban.AllowUserToResizeRows = false;
            this.grdGanban.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdGanban.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdGanban.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdGanban.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGanban.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.grdGanban.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdGanban.Data = null;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdGanban.DefaultCellStyle = dataGridViewCellStyle2;
            this.grdGanban.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdGanban.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdGanban.EnableHeadersVisualStyles = false;
            this.grdGanban.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdGanban.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdGanban.LanguageCategory = null;
            this.grdGanban.LanguageCode = null;
            this.grdGanban.Location = new System.Drawing.Point(3, 389);
            this.grdGanban.Name = "grdGanban";
            this.grdGanban.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle3.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle3.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGanban.RowHeadersDefaultCellStyle = dataGridViewCellStyle3;
            this.grdGanban.RowHeadersVisible = false;
            this.grdGanban.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdGanban.RowTemplate.Height = 23;
            this.grdGanban.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdGanban.Size = new System.Drawing.Size(1274, 407);
            this.grdGanban.TabIndex = 2;
            // 
            // frmGanban
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 1024);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmGanban";
            this.Text = "간판라벨발행";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.panel1.ResumeLayout(false);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tableLayoutPanel2.PerformLayout();
            this.tableLayoutPanel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.grdGanban)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnLabelPrint;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btnGanbandelete;
        private System.Windows.Forms.Button btnSet;
        private System.Windows.Forms.TextBox txtSN;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        private System.Windows.Forms.Label lblDepartureGID;
        private System.Windows.Forms.Label lblPallet;
        private System.Windows.Forms.Label lblCT;
        private System.Windows.Forms.Label lblAllQty;
        private System.Windows.Forms.Button btnInit;
        private System.Windows.Forms.Button btnClose;
        private SmartMom_Lib.ExGrid grdGanban;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label lblGanbanQty;
        private System.Windows.Forms.Label lblStock;
        private System.Windows.Forms.Label lblVendorNm;
        private System.Windows.Forms.ComboBox comboItem;
        private System.Windows.Forms.Button btnGanbanSet;
        private System.Windows.Forms.Label lblCtQty;
        private System.Windows.Forms.Button btnAutoLabelPrint;
        private System.Windows.Forms.Button bntReprint;
        private System.Windows.Forms.Label lblPossibleQty;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label lblLabelID;
    }
}