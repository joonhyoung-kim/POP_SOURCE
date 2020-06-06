using SmartMom_Lib;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    partial class frmLabelDesign_P01
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
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel3 = new System.Windows.Forms.Panel();
            this.cmbPrint = new System.Windows.Forms.ComboBox();
            this.Label5 = new System.Windows.Forms.Label();
            this.txtLabelID = new System.Windows.Forms.TextBox();
            this.Label1 = new System.Windows.Forms.Label();
            this.btnDupConfirm = new System.Windows.Forms.Button();
            this.cmbState = new System.Windows.Forms.ComboBox();
            this.Label3 = new System.Windows.Forms.Label();
            this.Label2 = new System.Windows.Forms.Label();
            this.Label4 = new System.Windows.Forms.Label();
            this.txtLabelDesc = new System.Windows.Forms.TextBox();
            this.txtFile = new System.Windows.Forms.TextBox();
            this.btnLabelListSave = new System.Windows.Forms.Button();
            this.btnFile = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.tableMain = new System.Windows.Forms.TableLayoutPanel();
            this.tableSubTop = new System.Windows.Forms.TableLayoutPanel();
            this.lblLabelID = new System.Windows.Forms.Label();
            this.btnPrint = new System.Windows.Forms.Button();
            this.btnAdd = new System.Windows.Forms.Button();
            this.btnSearch = new System.Windows.Forms.Button();
            this.panel4 = new System.Windows.Forms.Panel();
            this.btnMove = new System.Windows.Forms.Button();
            this.Label14 = new System.Windows.Forms.Label();
            this.Label9 = new System.Windows.Forms.Label();
            this.cmbMoveY = new System.Windows.Forms.ComboBox();
            this.cmbMoveX = new System.Windows.Forms.ComboBox();
            this.pnlMain = new System.Windows.Forms.Panel();
            this.btnBARCODE_HEIGHT_MM = new System.Windows.Forms.Button();
            this.btnHEIGHT_AREA_MM = new System.Windows.Forms.Button();
            this.btnWIDTH_AREA_MM = new System.Windows.Forms.Button();
            this.btnY_POSITION_MM = new System.Windows.Forms.Button();
            this.btnX_POSITION_MM = new System.Windows.Forms.Button();
            this.cmbBARCODE_RATIO = new System.Windows.Forms.ComboBox();
            this.cmbBARCODE_MODULE_WIDTH = new System.Windows.Forms.ComboBox();
            this.cmbLANDSCAPE = new System.Windows.Forms.ComboBox();
            this.cmbBARCODE_2D_SIZE = new System.Windows.Forms.ComboBox();
            this.cmbBARCODE_TEXT_UNDER_YN = new System.Windows.Forms.ComboBox();
            this.cmbMethod = new System.Windows.Forms.ComboBox();
            this.Label13 = new System.Windows.Forms.Label();
            this.Label12 = new System.Windows.Forms.Label();
            this.lblY_POSITION_PIX = new System.Windows.Forms.Label();
            this.lblX_POSITION_PIX = new System.Windows.Forms.Label();
            this.lblY_POSITION_MM = new System.Windows.Forms.Label();
            this.lblX_POSITION_MM = new System.Windows.Forms.Label();
            this.btnLabelObjectSave = new System.Windows.Forms.Button();
            this.btnLabelObjectDelete = new System.Windows.Forms.Button();
            this.Label7 = new System.Windows.Forms.Label();
            this.btnBARCODE_HEIGHT_PIX = new System.Windows.Forms.Button();
            this.btnHEIGHT_AREA_PIX = new System.Windows.Forms.Button();
            this.btnY_POSITION_PIX = new System.Windows.Forms.Button();
            this.btnWIDTH_AREA_PIX = new System.Windows.Forms.Button();
            this.btnX_POSITION_PIX = new System.Windows.Forms.Button();
            this.Label19 = new System.Windows.Forms.Label();
            this.lblBARCODE_HEIGHT_PIX = new System.Windows.Forms.Label();
            this.Label18 = new System.Windows.Forms.Label();
            this.lblBARCODE_HEIGHT_MM = new System.Windows.Forms.Label();
            this.lblHEIGHT_AREA_PIX = new System.Windows.Forms.Label();
            this.lblStatus = new System.Windows.Forms.Label();
            this.Label23 = new System.Windows.Forms.Label();
            this.lblWIDTH_AREA_PIX = new System.Windows.Forms.Label();
            this.Label22 = new System.Windows.Forms.Label();
            this.lblHEIGHT_AREA_MM = new System.Windows.Forms.Label();
            this.Label21 = new System.Windows.Forms.Label();
            this.lblWIDTH_AREA_MM = new System.Windows.Forms.Label();
            this.Label6 = new System.Windows.Forms.Label();
            this.txtLABEL_SEQ = new System.Windows.Forms.TextBox();
            this.txtLABEL_VALUE = new System.Windows.Forms.TextBox();
            this.txtLINE_THICKNESS = new System.Windows.Forms.TextBox();
            this.txtY_POSITION_PIX = new System.Windows.Forms.TextBox();
            this.txtX_POSITION_PIX = new System.Windows.Forms.TextBox();
            this.txtY_POSITION_MM = new System.Windows.Forms.TextBox();
            this.txtHEIGHT_AREA_PIX = new System.Windows.Forms.TextBox();
            this.txtBARCODE_HEIGHT_PIX = new System.Windows.Forms.TextBox();
            this.txtBARCODE_HEIGHT_MM = new System.Windows.Forms.TextBox();
            this.txtWIDTH_AREA_PIX = new System.Windows.Forms.TextBox();
            this.txtHEIGHT_AREA_MM = new System.Windows.Forms.TextBox();
            this.txtWIDTH_AREA_MM = new System.Windows.Forms.TextBox();
            this.txtX_POSITION_MM = new System.Windows.Forms.TextBox();
            this.grdLabelObject = new SmartMom_Lib.ExGrid();
            this.btnClose = new System.Windows.Forms.Button();
            this.METHODID = new System.Windows.Forms.DataGridViewComboBoxColumn();
            this.PRINTID = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.LABELSEQ = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.LABELVALUE = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.XPOSITIONMM = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.YPOSITIONMM = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.XPOSITIONPIX = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.YPOSITIONPIX = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.LINETHICKNESS = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.WIDTHAREAMM = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.HEIGHTAREAMM = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.WIDTHAREAPIX = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.HEIGHTAREAPIX = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.BARCODEMODULEWIDTH = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.BARCODERATIO = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.LANDSCAPE = new System.Windows.Forms.DataGridViewComboBoxColumn();
            this.BARCODEHEIGHTMM = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.BARCODEHEIGHTPIX = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.BARCODETEXTUNDERYN = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.BARCODE2DSIZE = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.CREATEBY = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.CREATEDATE = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.UPDATEBY = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.UPDATEDATE = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.panel2.SuspendLayout();
            this.panel3.SuspendLayout();
            this.tableMain.SuspendLayout();
            this.tableSubTop.SuspendLayout();
            this.panel4.SuspendLayout();
            this.pnlMain.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdLabelObject)).BeginInit();
            this.SuspendLayout();
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.Gainsboro;
            this.panel2.Controls.Add(this.panel3);
            this.panel2.Controls.Add(this.cmbState);
            this.panel2.Controls.Add(this.Label3);
            this.panel2.Controls.Add(this.Label2);
            this.panel2.Controls.Add(this.Label4);
            this.panel2.Controls.Add(this.txtLabelDesc);
            this.panel2.Controls.Add(this.txtFile);
            this.panel2.Controls.Add(this.btnLabelListSave);
            this.panel2.Controls.Add(this.btnFile);
            this.panel2.Controls.Add(this.panel1);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(3, 286);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1065, 86);
            this.panel2.TabIndex = 12;
            // 
            // panel3
            // 
            this.panel3.BackColor = System.Drawing.Color.Khaki;
            this.panel3.Controls.Add(this.cmbPrint);
            this.panel3.Controls.Add(this.Label5);
            this.panel3.Controls.Add(this.txtLabelID);
            this.panel3.Controls.Add(this.Label1);
            this.panel3.Controls.Add(this.btnDupConfirm);
            this.panel3.Location = new System.Drawing.Point(12, 11);
            this.panel3.Margin = new System.Windows.Forms.Padding(0);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(548, 31);
            this.panel3.TabIndex = 13;
            // 
            // cmbPrint
            // 
            this.cmbPrint.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbPrint.FormattingEnabled = true;
            this.cmbPrint.Location = new System.Drawing.Point(284, 5);
            this.cmbPrint.Name = "cmbPrint";
            this.cmbPrint.Size = new System.Drawing.Size(149, 20);
            this.cmbPrint.TabIndex = 12;
            // 
            // Label5
            // 
            this.Label5.AutoSize = true;
            this.Label5.Location = new System.Drawing.Point(237, 11);
            this.Label5.Name = "Label5";
            this.Label5.Size = new System.Drawing.Size(41, 12);
            this.Label5.TabIndex = 11;
            this.Label5.Text = "프린터";
            // 
            // txtLabelID
            // 
            this.txtLabelID.Location = new System.Drawing.Point(72, 6);
            this.txtLabelID.Name = "txtLabelID";
            this.txtLabelID.Size = new System.Drawing.Size(155, 21);
            this.txtLabelID.TabIndex = 10;
            // 
            // Label1
            // 
            this.Label1.AutoSize = true;
            this.Label1.Location = new System.Drawing.Point(2, 11);
            this.Label1.Name = "Label1";
            this.Label1.Size = new System.Drawing.Size(29, 12);
            this.Label1.TabIndex = 11;
            this.Label1.Text = "라벨";
            // 
            // btnDupConfirm
            // 
            this.btnDupConfirm.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnDupConfirm.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnDupConfirm.ForeColor = System.Drawing.Color.White;
            this.btnDupConfirm.Location = new System.Drawing.Point(436, 3);
            this.btnDupConfirm.Margin = new System.Windows.Forms.Padding(0);
            this.btnDupConfirm.Name = "btnDupConfirm";
            this.btnDupConfirm.Size = new System.Drawing.Size(105, 24);
            this.btnDupConfirm.TabIndex = 4;
            this.btnDupConfirm.Text = "중복확인";
            this.btnDupConfirm.UseVisualStyleBackColor = false;
            this.btnDupConfirm.Click += new System.EventHandler(this.btnDupConfirm_Click);
            // 
            // cmbState
            // 
            this.cmbState.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbState.FormattingEnabled = true;
            this.cmbState.Items.AddRange(new object[] {
            "Valid",
            "Invalid"});
            this.cmbState.Location = new System.Drawing.Point(693, 19);
            this.cmbState.Name = "cmbState";
            this.cmbState.Size = new System.Drawing.Size(212, 20);
            this.cmbState.TabIndex = 12;
            // 
            // Label3
            // 
            this.Label3.AutoSize = true;
            this.Label3.Location = new System.Drawing.Point(597, 23);
            this.Label3.Name = "Label3";
            this.Label3.Size = new System.Drawing.Size(53, 12);
            this.Label3.TabIndex = 11;
            this.Label3.Text = "사용유무";
            // 
            // Label2
            // 
            this.Label2.AutoSize = true;
            this.Label2.Location = new System.Drawing.Point(591, 52);
            this.Label2.Name = "Label2";
            this.Label2.Size = new System.Drawing.Size(96, 12);
            this.Label2.TabIndex = 11;
            this.Label2.Text = "라벨 Description";
            // 
            // Label4
            // 
            this.Label4.AutoSize = true;
            this.Label4.Location = new System.Drawing.Point(10, 52);
            this.Label4.Name = "Label4";
            this.Label4.Size = new System.Drawing.Size(69, 12);
            this.Label4.TabIndex = 11;
            this.Label4.Text = "라벨 사양서";
            // 
            // txtLabelDesc
            // 
            this.txtLabelDesc.Location = new System.Drawing.Point(693, 49);
            this.txtLabelDesc.Name = "txtLabelDesc";
            this.txtLabelDesc.Size = new System.Drawing.Size(212, 21);
            this.txtLabelDesc.TabIndex = 10;
            // 
            // txtFile
            // 
            this.txtFile.Location = new System.Drawing.Point(84, 49);
            this.txtFile.Name = "txtFile";
            this.txtFile.ReadOnly = true;
            this.txtFile.Size = new System.Drawing.Size(412, 21);
            this.txtFile.TabIndex = 10;
            // 
            // btnLabelListSave
            // 
            this.btnLabelListSave.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnLabelListSave.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnLabelListSave.ForeColor = System.Drawing.Color.White;
            this.btnLabelListSave.Location = new System.Drawing.Point(908, 17);
            this.btnLabelListSave.Margin = new System.Windows.Forms.Padding(0);
            this.btnLabelListSave.Name = "btnLabelListSave";
            this.btnLabelListSave.Size = new System.Drawing.Size(120, 50);
            this.btnLabelListSave.TabIndex = 4;
            this.btnLabelListSave.Text = "라 벨 저 장";
            this.btnLabelListSave.UseVisualStyleBackColor = false;
            this.btnLabelListSave.Click += new System.EventHandler(this.btnLabelListSave_Click);
            // 
            // btnFile
            // 
            this.btnFile.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnFile.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnFile.ForeColor = System.Drawing.Color.White;
            this.btnFile.Location = new System.Drawing.Point(498, 48);
            this.btnFile.Margin = new System.Windows.Forms.Padding(0);
            this.btnFile.Name = "btnFile";
            this.btnFile.Size = new System.Drawing.Size(55, 24);
            this.btnFile.TabIndex = 4;
            this.btnFile.Text = "...";
            this.btnFile.UseVisualStyleBackColor = false;
            // 
            // panel1
            // 
            this.panel1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.panel1.BackColor = System.Drawing.Color.Red;
            this.panel1.Location = new System.Drawing.Point(10, 77);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1045, 3);
            this.panel1.TabIndex = 1;
            // 
            // tableMain
            // 
            this.tableMain.ColumnCount = 1;
            this.tableMain.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableMain.Controls.Add(this.tableSubTop, 0, 0);
            this.tableMain.Controls.Add(this.pnlMain, 0, 3);
            this.tableMain.Controls.Add(this.panel2, 0, 2);
            this.tableMain.Controls.Add(this.grdLabelObject, 0, 1);
            this.tableMain.Controls.Add(this.btnClose, 0, 4);
            this.tableMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableMain.Location = new System.Drawing.Point(20, 60);
            this.tableMain.Name = "tableMain";
            this.tableMain.RowCount = 5;
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 59F));
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 92F));
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 253F));
            this.tableMain.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 34F));
            this.tableMain.Size = new System.Drawing.Size(1071, 662);
            this.tableMain.TabIndex = 1;
            // 
            // tableSubTop
            // 
            this.tableSubTop.ColumnCount = 5;
            this.tableSubTop.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 300F));
            this.tableSubTop.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableSubTop.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 120F));
            this.tableSubTop.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 102F));
            this.tableSubTop.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 68F));
            this.tableSubTop.Controls.Add(this.lblLabelID, 1, 0);
            this.tableSubTop.Controls.Add(this.btnPrint, 2, 0);
            this.tableSubTop.Controls.Add(this.btnAdd, 3, 0);
            this.tableSubTop.Controls.Add(this.btnSearch, 4, 0);
            this.tableSubTop.Controls.Add(this.panel4, 0, 0);
            this.tableSubTop.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableSubTop.Location = new System.Drawing.Point(3, 3);
            this.tableSubTop.Name = "tableSubTop";
            this.tableSubTop.RowCount = 1;
            this.tableSubTop.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableSubTop.Size = new System.Drawing.Size(1065, 53);
            this.tableSubTop.TabIndex = 8;
            // 
            // lblLabelID
            // 
            this.lblLabelID.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblLabelID.Font = new System.Drawing.Font("굴림", 15.75F, System.Drawing.FontStyle.Bold);
            this.lblLabelID.Location = new System.Drawing.Point(303, 0);
            this.lblLabelID.Name = "lblLabelID";
            this.lblLabelID.Size = new System.Drawing.Size(469, 53);
            this.lblLabelID.TabIndex = 3;
            this.lblLabelID.Text = "No Label List";
            this.lblLabelID.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnPrint
            // 
            this.btnPrint.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnPrint.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPrint.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold);
            this.btnPrint.ForeColor = System.Drawing.Color.White;
            this.btnPrint.Location = new System.Drawing.Point(778, 3);
            this.btnPrint.Name = "btnPrint";
            this.btnPrint.Size = new System.Drawing.Size(114, 47);
            this.btnPrint.TabIndex = 4;
            this.btnPrint.Text = "인쇄";
            this.btnPrint.UseVisualStyleBackColor = false;
            this.btnPrint.Click += new System.EventHandler(this.btnPrint_Click);
            // 
            // btnAdd
            // 
            this.btnAdd.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnAdd.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnAdd.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold);
            this.btnAdd.ForeColor = System.Drawing.Color.White;
            this.btnAdd.Location = new System.Drawing.Point(898, 3);
            this.btnAdd.Name = "btnAdd";
            this.btnAdd.Size = new System.Drawing.Size(96, 47);
            this.btnAdd.TabIndex = 4;
            this.btnAdd.Text = "추가";
            this.btnAdd.UseVisualStyleBackColor = false;
            this.btnAdd.Click += new System.EventHandler(this.btnAdd_Click);
            // 
            // btnSearch
            // 
            this.btnSearch.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnSearch.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSearch.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold);
            this.btnSearch.ForeColor = System.Drawing.Color.White;
            this.btnSearch.Location = new System.Drawing.Point(1000, 3);
            this.btnSearch.Name = "btnSearch";
            this.btnSearch.Size = new System.Drawing.Size(62, 47);
            this.btnSearch.TabIndex = 4;
            this.btnSearch.Text = "조회";
            this.btnSearch.UseVisualStyleBackColor = false;
            this.btnSearch.Click += new System.EventHandler(this.btnSearch_Click);
            // 
            // panel4
            // 
            this.panel4.Controls.Add(this.btnMove);
            this.panel4.Controls.Add(this.Label14);
            this.panel4.Controls.Add(this.Label9);
            this.panel4.Controls.Add(this.cmbMoveY);
            this.panel4.Controls.Add(this.cmbMoveX);
            this.panel4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel4.Location = new System.Drawing.Point(0, 0);
            this.panel4.Margin = new System.Windows.Forms.Padding(0);
            this.panel4.Name = "panel4";
            this.panel4.Size = new System.Drawing.Size(300, 53);
            this.panel4.TabIndex = 5;
            // 
            // btnMove
            // 
            this.btnMove.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnMove.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold);
            this.btnMove.ForeColor = System.Drawing.Color.White;
            this.btnMove.Location = new System.Drawing.Point(188, 5);
            this.btnMove.Name = "btnMove";
            this.btnMove.Size = new System.Drawing.Size(102, 45);
            this.btnMove.TabIndex = 4;
            this.btnMove.Text = "Move";
            this.btnMove.UseVisualStyleBackColor = false;
            this.btnMove.Click += new System.EventHandler(this.btnMove_Click);
            // 
            // Label14
            // 
            this.Label14.AutoSize = true;
            this.Label14.Location = new System.Drawing.Point(8, 31);
            this.Label14.Name = "Label14";
            this.Label14.Size = new System.Drawing.Size(57, 12);
            this.Label14.TabIndex = 11;
            this.Label14.Text = "Y축(mm)";
            // 
            // Label9
            // 
            this.Label9.AutoSize = true;
            this.Label9.Location = new System.Drawing.Point(8, 8);
            this.Label9.Name = "Label9";
            this.Label9.Size = new System.Drawing.Size(57, 12);
            this.Label9.TabIndex = 11;
            this.Label9.Text = "X축(mm)";
            // 
            // cmbMoveY
            // 
            this.cmbMoveY.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbMoveY.FormattingEnabled = true;
            this.cmbMoveY.Location = new System.Drawing.Point(77, 30);
            this.cmbMoveY.Name = "cmbMoveY";
            this.cmbMoveY.Size = new System.Drawing.Size(105, 20);
            this.cmbMoveY.TabIndex = 12;
            this.cmbMoveY.Tag = "METHOD_ID";
            this.cmbMoveY.SelectedValueChanged += new System.EventHandler(this.cmbMethod_SelectedValueChanged);
            // 
            // cmbMoveX
            // 
            this.cmbMoveX.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbMoveX.FormattingEnabled = true;
            this.cmbMoveX.Location = new System.Drawing.Point(77, 5);
            this.cmbMoveX.Name = "cmbMoveX";
            this.cmbMoveX.Size = new System.Drawing.Size(105, 20);
            this.cmbMoveX.TabIndex = 12;
            this.cmbMoveX.Tag = "METHOD_ID";
            this.cmbMoveX.SelectedValueChanged += new System.EventHandler(this.cmbMethod_SelectedValueChanged);
            // 
            // pnlMain
            // 
            this.pnlMain.BackColor = System.Drawing.Color.Gainsboro;
            this.pnlMain.Controls.Add(this.btnBARCODE_HEIGHT_MM);
            this.pnlMain.Controls.Add(this.btnHEIGHT_AREA_MM);
            this.pnlMain.Controls.Add(this.btnWIDTH_AREA_MM);
            this.pnlMain.Controls.Add(this.btnY_POSITION_MM);
            this.pnlMain.Controls.Add(this.btnX_POSITION_MM);
            this.pnlMain.Controls.Add(this.cmbBARCODE_RATIO);
            this.pnlMain.Controls.Add(this.cmbBARCODE_MODULE_WIDTH);
            this.pnlMain.Controls.Add(this.cmbLANDSCAPE);
            this.pnlMain.Controls.Add(this.cmbBARCODE_2D_SIZE);
            this.pnlMain.Controls.Add(this.cmbBARCODE_TEXT_UNDER_YN);
            this.pnlMain.Controls.Add(this.cmbMethod);
            this.pnlMain.Controls.Add(this.Label13);
            this.pnlMain.Controls.Add(this.Label12);
            this.pnlMain.Controls.Add(this.lblY_POSITION_PIX);
            this.pnlMain.Controls.Add(this.lblX_POSITION_PIX);
            this.pnlMain.Controls.Add(this.lblY_POSITION_MM);
            this.pnlMain.Controls.Add(this.lblX_POSITION_MM);
            this.pnlMain.Controls.Add(this.btnLabelObjectSave);
            this.pnlMain.Controls.Add(this.btnLabelObjectDelete);
            this.pnlMain.Controls.Add(this.Label7);
            this.pnlMain.Controls.Add(this.btnBARCODE_HEIGHT_PIX);
            this.pnlMain.Controls.Add(this.btnHEIGHT_AREA_PIX);
            this.pnlMain.Controls.Add(this.btnY_POSITION_PIX);
            this.pnlMain.Controls.Add(this.btnWIDTH_AREA_PIX);
            this.pnlMain.Controls.Add(this.btnX_POSITION_PIX);
            this.pnlMain.Controls.Add(this.Label19);
            this.pnlMain.Controls.Add(this.lblBARCODE_HEIGHT_PIX);
            this.pnlMain.Controls.Add(this.Label18);
            this.pnlMain.Controls.Add(this.lblBARCODE_HEIGHT_MM);
            this.pnlMain.Controls.Add(this.lblHEIGHT_AREA_PIX);
            this.pnlMain.Controls.Add(this.lblStatus);
            this.pnlMain.Controls.Add(this.Label23);
            this.pnlMain.Controls.Add(this.lblWIDTH_AREA_PIX);
            this.pnlMain.Controls.Add(this.Label22);
            this.pnlMain.Controls.Add(this.lblHEIGHT_AREA_MM);
            this.pnlMain.Controls.Add(this.Label21);
            this.pnlMain.Controls.Add(this.lblWIDTH_AREA_MM);
            this.pnlMain.Controls.Add(this.Label6);
            this.pnlMain.Controls.Add(this.txtLABEL_SEQ);
            this.pnlMain.Controls.Add(this.txtLABEL_VALUE);
            this.pnlMain.Controls.Add(this.txtLINE_THICKNESS);
            this.pnlMain.Controls.Add(this.txtY_POSITION_PIX);
            this.pnlMain.Controls.Add(this.txtX_POSITION_PIX);
            this.pnlMain.Controls.Add(this.txtY_POSITION_MM);
            this.pnlMain.Controls.Add(this.txtHEIGHT_AREA_PIX);
            this.pnlMain.Controls.Add(this.txtBARCODE_HEIGHT_PIX);
            this.pnlMain.Controls.Add(this.txtBARCODE_HEIGHT_MM);
            this.pnlMain.Controls.Add(this.txtWIDTH_AREA_PIX);
            this.pnlMain.Controls.Add(this.txtHEIGHT_AREA_MM);
            this.pnlMain.Controls.Add(this.txtWIDTH_AREA_MM);
            this.pnlMain.Controls.Add(this.txtX_POSITION_MM);
            this.pnlMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMain.Location = new System.Drawing.Point(3, 378);
            this.pnlMain.Name = "pnlMain";
            this.pnlMain.Size = new System.Drawing.Size(1065, 247);
            this.pnlMain.TabIndex = 10;
            // 
            // btnBARCODE_HEIGHT_MM
            // 
            this.btnBARCODE_HEIGHT_MM.BackColor = System.Drawing.Color.Green;
            this.btnBARCODE_HEIGHT_MM.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBARCODE_HEIGHT_MM.ForeColor = System.Drawing.Color.White;
            this.btnBARCODE_HEIGHT_MM.Location = new System.Drawing.Point(927, 122);
            this.btnBARCODE_HEIGHT_MM.Margin = new System.Windows.Forms.Padding(0);
            this.btnBARCODE_HEIGHT_MM.Name = "btnBARCODE_HEIGHT_MM";
            this.btnBARCODE_HEIGHT_MM.Size = new System.Drawing.Size(88, 24);
            this.btnBARCODE_HEIGHT_MM.TabIndex = 15;
            this.btnBARCODE_HEIGHT_MM.Tag = "BARCODE_HEIGHT_PIX";
            this.btnBARCODE_HEIGHT_MM.Text = "Genarator";
            this.btnBARCODE_HEIGHT_MM.UseVisualStyleBackColor = false;
            this.btnBARCODE_HEIGHT_MM.Click += new System.EventHandler(this.btnBARCODE_HEIGHT_MM_Click);
            // 
            // btnHEIGHT_AREA_MM
            // 
            this.btnHEIGHT_AREA_MM.BackColor = System.Drawing.Color.Green;
            this.btnHEIGHT_AREA_MM.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnHEIGHT_AREA_MM.ForeColor = System.Drawing.Color.White;
            this.btnHEIGHT_AREA_MM.Location = new System.Drawing.Point(602, 68);
            this.btnHEIGHT_AREA_MM.Margin = new System.Windows.Forms.Padding(0);
            this.btnHEIGHT_AREA_MM.Name = "btnHEIGHT_AREA_MM";
            this.btnHEIGHT_AREA_MM.Size = new System.Drawing.Size(88, 24);
            this.btnHEIGHT_AREA_MM.TabIndex = 14;
            this.btnHEIGHT_AREA_MM.Tag = "WIDTH_AREA_PIX";
            this.btnHEIGHT_AREA_MM.Text = "Genarator";
            this.btnHEIGHT_AREA_MM.UseVisualStyleBackColor = false;
            this.btnHEIGHT_AREA_MM.Click += new System.EventHandler(this.btnHEIGHT_AREA_MM_Click);
            // 
            // btnWIDTH_AREA_MM
            // 
            this.btnWIDTH_AREA_MM.BackColor = System.Drawing.Color.Green;
            this.btnWIDTH_AREA_MM.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnWIDTH_AREA_MM.ForeColor = System.Drawing.Color.White;
            this.btnWIDTH_AREA_MM.Location = new System.Drawing.Point(602, 41);
            this.btnWIDTH_AREA_MM.Margin = new System.Windows.Forms.Padding(0);
            this.btnWIDTH_AREA_MM.Name = "btnWIDTH_AREA_MM";
            this.btnWIDTH_AREA_MM.Size = new System.Drawing.Size(88, 24);
            this.btnWIDTH_AREA_MM.TabIndex = 14;
            this.btnWIDTH_AREA_MM.Tag = "WIDTH_AREA_PIX";
            this.btnWIDTH_AREA_MM.Text = "Genarator";
            this.btnWIDTH_AREA_MM.UseVisualStyleBackColor = false;
            this.btnWIDTH_AREA_MM.Click += new System.EventHandler(this.btnWIDTH_AREA_MM_Click);
            // 
            // btnY_POSITION_MM
            // 
            this.btnY_POSITION_MM.BackColor = System.Drawing.Color.Green;
            this.btnY_POSITION_MM.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnY_POSITION_MM.ForeColor = System.Drawing.Color.White;
            this.btnY_POSITION_MM.Location = new System.Drawing.Point(255, 95);
            this.btnY_POSITION_MM.Margin = new System.Windows.Forms.Padding(0);
            this.btnY_POSITION_MM.Name = "btnY_POSITION_MM";
            this.btnY_POSITION_MM.Size = new System.Drawing.Size(88, 24);
            this.btnY_POSITION_MM.TabIndex = 13;
            this.btnY_POSITION_MM.Tag = "X_POSITION_PIX";
            this.btnY_POSITION_MM.Text = "Genarator";
            this.btnY_POSITION_MM.UseVisualStyleBackColor = false;
            this.btnY_POSITION_MM.Click += new System.EventHandler(this.btnY_POSITION_MM_Click);
            // 
            // btnX_POSITION_MM
            // 
            this.btnX_POSITION_MM.BackColor = System.Drawing.Color.Green;
            this.btnX_POSITION_MM.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnX_POSITION_MM.ForeColor = System.Drawing.Color.White;
            this.btnX_POSITION_MM.Location = new System.Drawing.Point(255, 68);
            this.btnX_POSITION_MM.Margin = new System.Windows.Forms.Padding(0);
            this.btnX_POSITION_MM.Name = "btnX_POSITION_MM";
            this.btnX_POSITION_MM.Size = new System.Drawing.Size(88, 24);
            this.btnX_POSITION_MM.TabIndex = 13;
            this.btnX_POSITION_MM.Tag = "X_POSITION_PIX";
            this.btnX_POSITION_MM.Text = "Genarator";
            this.btnX_POSITION_MM.UseVisualStyleBackColor = false;
            this.btnX_POSITION_MM.Click += new System.EventHandler(this.btnX_POSITION_MM_Click);
            // 
            // cmbBARCODE_RATIO
            // 
            this.cmbBARCODE_RATIO.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbBARCODE_RATIO.FormattingEnabled = true;
            this.cmbBARCODE_RATIO.Location = new System.Drawing.Point(824, 69);
            this.cmbBARCODE_RATIO.Name = "cmbBARCODE_RATIO";
            this.cmbBARCODE_RATIO.Size = new System.Drawing.Size(191, 20);
            this.cmbBARCODE_RATIO.TabIndex = 12;
            this.cmbBARCODE_RATIO.Tag = "BARCODE_RATIO";
            // 
            // cmbBARCODE_MODULE_WIDTH
            // 
            this.cmbBARCODE_MODULE_WIDTH.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbBARCODE_MODULE_WIDTH.FormattingEnabled = true;
            this.cmbBARCODE_MODULE_WIDTH.Location = new System.Drawing.Point(824, 42);
            this.cmbBARCODE_MODULE_WIDTH.Name = "cmbBARCODE_MODULE_WIDTH";
            this.cmbBARCODE_MODULE_WIDTH.Size = new System.Drawing.Size(191, 20);
            this.cmbBARCODE_MODULE_WIDTH.TabIndex = 12;
            this.cmbBARCODE_MODULE_WIDTH.Tag = "BARCODE_MODULE_WIDTH";
            // 
            // cmbLANDSCAPE
            // 
            this.cmbLANDSCAPE.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbLANDSCAPE.FormattingEnabled = true;
            this.cmbLANDSCAPE.Location = new System.Drawing.Point(824, 96);
            this.cmbLANDSCAPE.Name = "cmbLANDSCAPE";
            this.cmbLANDSCAPE.Size = new System.Drawing.Size(191, 20);
            this.cmbLANDSCAPE.TabIndex = 12;
            this.cmbLANDSCAPE.Tag = "LANDSCAPE";
            // 
            // cmbBARCODE_2D_SIZE
            // 
            this.cmbBARCODE_2D_SIZE.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbBARCODE_2D_SIZE.FormattingEnabled = true;
            this.cmbBARCODE_2D_SIZE.Location = new System.Drawing.Point(649, 176);
            this.cmbBARCODE_2D_SIZE.Name = "cmbBARCODE_2D_SIZE";
            this.cmbBARCODE_2D_SIZE.Size = new System.Drawing.Size(166, 20);
            this.cmbBARCODE_2D_SIZE.TabIndex = 12;
            this.cmbBARCODE_2D_SIZE.Tag = "BARCODE_2D_SIZE";
            // 
            // cmbBARCODE_TEXT_UNDER_YN
            // 
            this.cmbBARCODE_TEXT_UNDER_YN.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbBARCODE_TEXT_UNDER_YN.FormattingEnabled = true;
            this.cmbBARCODE_TEXT_UNDER_YN.Location = new System.Drawing.Point(497, 149);
            this.cmbBARCODE_TEXT_UNDER_YN.Name = "cmbBARCODE_TEXT_UNDER_YN";
            this.cmbBARCODE_TEXT_UNDER_YN.Size = new System.Drawing.Size(191, 20);
            this.cmbBARCODE_TEXT_UNDER_YN.TabIndex = 12;
            this.cmbBARCODE_TEXT_UNDER_YN.Tag = "BARCODE_TEXT_UNDER_YN";
            // 
            // cmbMethod
            // 
            this.cmbMethod.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbMethod.FormattingEnabled = true;
            this.cmbMethod.Location = new System.Drawing.Point(112, 16);
            this.cmbMethod.Name = "cmbMethod";
            this.cmbMethod.Size = new System.Drawing.Size(231, 20);
            this.cmbMethod.TabIndex = 12;
            this.cmbMethod.Tag = "METHOD_ID";
            this.cmbMethod.SelectedValueChanged += new System.EventHandler(this.cmbMethod_SelectedValueChanged);
            // 
            // Label13
            // 
            this.Label13.AutoSize = true;
            this.Label13.Location = new System.Drawing.Point(10, 208);
            this.Label13.Name = "Label13";
            this.Label13.Size = new System.Drawing.Size(101, 12);
            this.Label13.TabIndex = 11;
            this.Label13.Text = "Value(Bind Data)";
            // 
            // Label12
            // 
            this.Label12.AutoSize = true;
            this.Label12.Location = new System.Drawing.Point(10, 180);
            this.Label12.Name = "Label12";
            this.Label12.Size = new System.Drawing.Size(41, 12);
            this.Label12.TabIndex = 11;
            this.Label12.Text = "선굵기";
            // 
            // lblY_POSITION_PIX
            // 
            this.lblY_POSITION_PIX.AutoSize = true;
            this.lblY_POSITION_PIX.Location = new System.Drawing.Point(10, 154);
            this.lblY_POSITION_PIX.Name = "lblY_POSITION_PIX";
            this.lblY_POSITION_PIX.Size = new System.Drawing.Size(102, 12);
            this.lblY_POSITION_PIX.TabIndex = 11;
            this.lblY_POSITION_PIX.Text = "Y축 포지션(pixel)";
            // 
            // lblX_POSITION_PIX
            // 
            this.lblX_POSITION_PIX.AutoSize = true;
            this.lblX_POSITION_PIX.Location = new System.Drawing.Point(10, 127);
            this.lblX_POSITION_PIX.Name = "lblX_POSITION_PIX";
            this.lblX_POSITION_PIX.Size = new System.Drawing.Size(102, 12);
            this.lblX_POSITION_PIX.TabIndex = 11;
            this.lblX_POSITION_PIX.Text = "X축 포지션(pixel)";
            // 
            // lblY_POSITION_MM
            // 
            this.lblY_POSITION_MM.AutoSize = true;
            this.lblY_POSITION_MM.Location = new System.Drawing.Point(10, 100);
            this.lblY_POSITION_MM.Name = "lblY_POSITION_MM";
            this.lblY_POSITION_MM.Size = new System.Drawing.Size(97, 12);
            this.lblY_POSITION_MM.TabIndex = 11;
            this.lblY_POSITION_MM.Text = "Y축 포지션(mm)";
            // 
            // lblX_POSITION_MM
            // 
            this.lblX_POSITION_MM.AutoSize = true;
            this.lblX_POSITION_MM.Location = new System.Drawing.Point(10, 72);
            this.lblX_POSITION_MM.Name = "lblX_POSITION_MM";
            this.lblX_POSITION_MM.Size = new System.Drawing.Size(97, 12);
            this.lblX_POSITION_MM.TabIndex = 11;
            this.lblX_POSITION_MM.Text = "X축 포지션(mm)";
            // 
            // btnLabelObjectSave
            // 
            this.btnLabelObjectSave.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnLabelObjectSave.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnLabelObjectSave.ForeColor = System.Drawing.Color.White;
            this.btnLabelObjectSave.Location = new System.Drawing.Point(706, 199);
            this.btnLabelObjectSave.Margin = new System.Windows.Forms.Padding(0);
            this.btnLabelObjectSave.Name = "btnLabelObjectSave";
            this.btnLabelObjectSave.Size = new System.Drawing.Size(153, 35);
            this.btnLabelObjectSave.TabIndex = 4;
            this.btnLabelObjectSave.Text = "라벨오브젝트 저장";
            this.btnLabelObjectSave.UseVisualStyleBackColor = false;
            this.btnLabelObjectSave.Click += new System.EventHandler(this.btnLabelObjectSave_Click);
            // 
            // btnLabelObjectDelete
            // 
            this.btnLabelObjectDelete.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnLabelObjectDelete.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnLabelObjectDelete.ForeColor = System.Drawing.Color.White;
            this.btnLabelObjectDelete.Location = new System.Drawing.Point(862, 199);
            this.btnLabelObjectDelete.Margin = new System.Windows.Forms.Padding(0);
            this.btnLabelObjectDelete.Name = "btnLabelObjectDelete";
            this.btnLabelObjectDelete.Size = new System.Drawing.Size(153, 35);
            this.btnLabelObjectDelete.TabIndex = 4;
            this.btnLabelObjectDelete.Text = "라벨오브젝트 삭제";
            this.btnLabelObjectDelete.UseVisualStyleBackColor = false;
            this.btnLabelObjectDelete.Click += new System.EventHandler(this.btnLabelObjectDelete_Click);
            // 
            // Label7
            // 
            this.Label7.AutoSize = true;
            this.Label7.Location = new System.Drawing.Point(10, 45);
            this.Label7.Name = "Label7";
            this.Label7.Size = new System.Drawing.Size(30, 12);
            this.Label7.TabIndex = 11;
            this.Label7.Text = "SEQ";
            // 
            // btnBARCODE_HEIGHT_PIX
            // 
            this.btnBARCODE_HEIGHT_PIX.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnBARCODE_HEIGHT_PIX.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnBARCODE_HEIGHT_PIX.ForeColor = System.Drawing.Color.White;
            this.btnBARCODE_HEIGHT_PIX.Location = new System.Drawing.Point(927, 149);
            this.btnBARCODE_HEIGHT_PIX.Margin = new System.Windows.Forms.Padding(0);
            this.btnBARCODE_HEIGHT_PIX.Name = "btnBARCODE_HEIGHT_PIX";
            this.btnBARCODE_HEIGHT_PIX.Size = new System.Drawing.Size(88, 24);
            this.btnBARCODE_HEIGHT_PIX.TabIndex = 4;
            this.btnBARCODE_HEIGHT_PIX.Tag = "BARCODE_HEIGHT_PIX";
            this.btnBARCODE_HEIGHT_PIX.Text = "Genarator";
            this.btnBARCODE_HEIGHT_PIX.UseVisualStyleBackColor = false;
            this.btnBARCODE_HEIGHT_PIX.Click += new System.EventHandler(this.btnBARCODE_HEIGHT_PIX_Click);
            // 
            // btnHEIGHT_AREA_PIX
            // 
            this.btnHEIGHT_AREA_PIX.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnHEIGHT_AREA_PIX.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnHEIGHT_AREA_PIX.ForeColor = System.Drawing.Color.White;
            this.btnHEIGHT_AREA_PIX.Location = new System.Drawing.Point(602, 122);
            this.btnHEIGHT_AREA_PIX.Margin = new System.Windows.Forms.Padding(0);
            this.btnHEIGHT_AREA_PIX.Name = "btnHEIGHT_AREA_PIX";
            this.btnHEIGHT_AREA_PIX.Size = new System.Drawing.Size(88, 24);
            this.btnHEIGHT_AREA_PIX.TabIndex = 4;
            this.btnHEIGHT_AREA_PIX.Tag = "HEIGHT_AREA_PIX";
            this.btnHEIGHT_AREA_PIX.Text = "Genarator";
            this.btnHEIGHT_AREA_PIX.UseVisualStyleBackColor = false;
            this.btnHEIGHT_AREA_PIX.Click += new System.EventHandler(this.btnHEIGHT_AREA_PIX_Click);
            // 
            // btnY_POSITION_PIX
            // 
            this.btnY_POSITION_PIX.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnY_POSITION_PIX.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnY_POSITION_PIX.ForeColor = System.Drawing.Color.White;
            this.btnY_POSITION_PIX.Location = new System.Drawing.Point(255, 149);
            this.btnY_POSITION_PIX.Margin = new System.Windows.Forms.Padding(0);
            this.btnY_POSITION_PIX.Name = "btnY_POSITION_PIX";
            this.btnY_POSITION_PIX.Size = new System.Drawing.Size(88, 24);
            this.btnY_POSITION_PIX.TabIndex = 4;
            this.btnY_POSITION_PIX.Tag = "Y_POSITION_PIX";
            this.btnY_POSITION_PIX.Text = "Genarator";
            this.btnY_POSITION_PIX.UseVisualStyleBackColor = false;
            this.btnY_POSITION_PIX.Click += new System.EventHandler(this.btnY_POSITION_PIX_Click);
            // 
            // btnWIDTH_AREA_PIX
            // 
            this.btnWIDTH_AREA_PIX.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnWIDTH_AREA_PIX.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnWIDTH_AREA_PIX.ForeColor = System.Drawing.Color.White;
            this.btnWIDTH_AREA_PIX.Location = new System.Drawing.Point(602, 95);
            this.btnWIDTH_AREA_PIX.Margin = new System.Windows.Forms.Padding(0);
            this.btnWIDTH_AREA_PIX.Name = "btnWIDTH_AREA_PIX";
            this.btnWIDTH_AREA_PIX.Size = new System.Drawing.Size(88, 24);
            this.btnWIDTH_AREA_PIX.TabIndex = 4;
            this.btnWIDTH_AREA_PIX.Tag = "WIDTH_AREA_PIX";
            this.btnWIDTH_AREA_PIX.Text = "Genarator";
            this.btnWIDTH_AREA_PIX.UseVisualStyleBackColor = false;
            this.btnWIDTH_AREA_PIX.Click += new System.EventHandler(this.btnWIDTH_AREA_PIX_Click);
            // 
            // btnX_POSITION_PIX
            // 
            this.btnX_POSITION_PIX.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnX_POSITION_PIX.Font = new System.Drawing.Font("맑은 고딕", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnX_POSITION_PIX.ForeColor = System.Drawing.Color.White;
            this.btnX_POSITION_PIX.Location = new System.Drawing.Point(255, 122);
            this.btnX_POSITION_PIX.Margin = new System.Windows.Forms.Padding(0);
            this.btnX_POSITION_PIX.Name = "btnX_POSITION_PIX";
            this.btnX_POSITION_PIX.Size = new System.Drawing.Size(88, 24);
            this.btnX_POSITION_PIX.TabIndex = 4;
            this.btnX_POSITION_PIX.Tag = "X_POSITION_PIX";
            this.btnX_POSITION_PIX.Text = "Genarator";
            this.btnX_POSITION_PIX.UseVisualStyleBackColor = false;
            this.btnX_POSITION_PIX.Click += new System.EventHandler(this.btnX_POSITION_PIX_Click);
            // 
            // Label19
            // 
            this.Label19.AutoSize = true;
            this.Label19.Location = new System.Drawing.Point(355, 180);
            this.Label19.Name = "Label19";
            this.Label19.Size = new System.Drawing.Size(295, 12);
            this.Label19.TabIndex = 11;
            this.Label19.Text = "2D 바코드 크기(QR코드 : 크기, PDF417 : 바코드높이)";
            // 
            // lblBARCODE_HEIGHT_PIX
            // 
            this.lblBARCODE_HEIGHT_PIX.AutoSize = true;
            this.lblBARCODE_HEIGHT_PIX.Location = new System.Drawing.Point(701, 154);
            this.lblBARCODE_HEIGHT_PIX.Name = "lblBARCODE_HEIGHT_PIX";
            this.lblBARCODE_HEIGHT_PIX.Size = new System.Drawing.Size(106, 12);
            this.lblBARCODE_HEIGHT_PIX.TabIndex = 11;
            this.lblBARCODE_HEIGHT_PIX.Text = "바코드 높이(pixel)";
            // 
            // Label18
            // 
            this.Label18.AutoSize = true;
            this.Label18.Location = new System.Drawing.Point(355, 154);
            this.Label18.Name = "Label18";
            this.Label18.Size = new System.Drawing.Size(141, 12);
            this.Label18.TabIndex = 11;
            this.Label18.Text = "바코드 Text 표시(Under)";
            // 
            // lblBARCODE_HEIGHT_MM
            // 
            this.lblBARCODE_HEIGHT_MM.AutoSize = true;
            this.lblBARCODE_HEIGHT_MM.Location = new System.Drawing.Point(701, 127);
            this.lblBARCODE_HEIGHT_MM.Name = "lblBARCODE_HEIGHT_MM";
            this.lblBARCODE_HEIGHT_MM.Size = new System.Drawing.Size(101, 12);
            this.lblBARCODE_HEIGHT_MM.TabIndex = 11;
            this.lblBARCODE_HEIGHT_MM.Text = "바코드 높이(mm)";
            // 
            // lblHEIGHT_AREA_PIX
            // 
            this.lblHEIGHT_AREA_PIX.AutoSize = true;
            this.lblHEIGHT_AREA_PIX.Location = new System.Drawing.Point(355, 127);
            this.lblHEIGHT_AREA_PIX.Name = "lblHEIGHT_AREA_PIX";
            this.lblHEIGHT_AREA_PIX.Size = new System.Drawing.Size(122, 12);
            this.lblHEIGHT_AREA_PIX.TabIndex = 11;
            this.lblHEIGHT_AREA_PIX.Text = "인쇄영역(높이, pixel)";
            // 
            // lblStatus
            // 
            this.lblStatus.AutoSize = true;
            this.lblStatus.Font = new System.Drawing.Font("굴림", 9F, System.Drawing.FontStyle.Bold);
            this.lblStatus.Location = new System.Drawing.Point(969, 19);
            this.lblStatus.Name = "lblStatus";
            this.lblStatus.Size = new System.Drawing.Size(46, 12);
            this.lblStatus.TabIndex = 11;
            this.lblStatus.Text = "Status";
            // 
            // Label23
            // 
            this.Label23.AutoSize = true;
            this.Label23.Location = new System.Drawing.Point(701, 100);
            this.Label23.Name = "Label23";
            this.Label23.Size = new System.Drawing.Size(73, 12);
            this.Label23.TabIndex = 11;
            this.Label23.Text = "바코드 Ratio";
            // 
            // lblWIDTH_AREA_PIX
            // 
            this.lblWIDTH_AREA_PIX.AutoSize = true;
            this.lblWIDTH_AREA_PIX.Location = new System.Drawing.Point(355, 100);
            this.lblWIDTH_AREA_PIX.Name = "lblWIDTH_AREA_PIX";
            this.lblWIDTH_AREA_PIX.Size = new System.Drawing.Size(122, 12);
            this.lblWIDTH_AREA_PIX.TabIndex = 11;
            this.lblWIDTH_AREA_PIX.Text = "인쇄영역(넓이, pixel)";
            // 
            // Label22
            // 
            this.Label22.AutoSize = true;
            this.Label22.Location = new System.Drawing.Point(701, 73);
            this.Label22.Name = "Label22";
            this.Label22.Size = new System.Drawing.Size(73, 12);
            this.Label22.TabIndex = 11;
            this.Label22.Text = "바코드 Ratio";
            // 
            // lblHEIGHT_AREA_MM
            // 
            this.lblHEIGHT_AREA_MM.AutoSize = true;
            this.lblHEIGHT_AREA_MM.Location = new System.Drawing.Point(355, 73);
            this.lblHEIGHT_AREA_MM.Name = "lblHEIGHT_AREA_MM";
            this.lblHEIGHT_AREA_MM.Size = new System.Drawing.Size(117, 12);
            this.lblHEIGHT_AREA_MM.TabIndex = 11;
            this.lblHEIGHT_AREA_MM.Text = "인쇄영역(높이, mm)";
            // 
            // Label21
            // 
            this.Label21.AutoSize = true;
            this.Label21.Location = new System.Drawing.Point(701, 46);
            this.Label21.Name = "Label21";
            this.Label21.Size = new System.Drawing.Size(114, 12);
            this.Label21.TabIndex = 11;
            this.Label21.Text = "바코드 ModueWidth";
            // 
            // lblWIDTH_AREA_MM
            // 
            this.lblWIDTH_AREA_MM.AutoSize = true;
            this.lblWIDTH_AREA_MM.Location = new System.Drawing.Point(355, 46);
            this.lblWIDTH_AREA_MM.Name = "lblWIDTH_AREA_MM";
            this.lblWIDTH_AREA_MM.Size = new System.Drawing.Size(117, 12);
            this.lblWIDTH_AREA_MM.TabIndex = 11;
            this.lblWIDTH_AREA_MM.Text = "인쇄영역(넓이, mm)";
            // 
            // Label6
            // 
            this.Label6.AutoSize = true;
            this.Label6.Location = new System.Drawing.Point(10, 19);
            this.Label6.Name = "Label6";
            this.Label6.Size = new System.Drawing.Size(47, 12);
            this.Label6.TabIndex = 11;
            this.Label6.Text = "Method";
            // 
            // txtLABEL_SEQ
            // 
            this.txtLABEL_SEQ.Location = new System.Drawing.Point(112, 42);
            this.txtLABEL_SEQ.Name = "txtLABEL_SEQ";
            this.txtLABEL_SEQ.ReadOnly = true;
            this.txtLABEL_SEQ.Size = new System.Drawing.Size(231, 21);
            this.txtLABEL_SEQ.TabIndex = 10;
            this.txtLABEL_SEQ.Tag = "LABEL_SEQ";
            // 
            // txtLABEL_VALUE
            // 
            this.txtLABEL_VALUE.BackColor = System.Drawing.Color.White;
            this.txtLABEL_VALUE.Location = new System.Drawing.Point(112, 205);
            this.txtLABEL_VALUE.Name = "txtLABEL_VALUE";
            this.txtLABEL_VALUE.Size = new System.Drawing.Size(576, 21);
            this.txtLABEL_VALUE.TabIndex = 10;
            this.txtLABEL_VALUE.Tag = "LABEL_VALUE";
            // 
            // txtLINE_THICKNESS
            // 
            this.txtLINE_THICKNESS.BackColor = System.Drawing.Color.White;
            this.txtLINE_THICKNESS.Location = new System.Drawing.Point(112, 177);
            this.txtLINE_THICKNESS.Name = "txtLINE_THICKNESS";
            this.txtLINE_THICKNESS.Size = new System.Drawing.Size(231, 21);
            this.txtLINE_THICKNESS.TabIndex = 10;
            this.txtLINE_THICKNESS.Tag = "LINE_THICKNESS";
            this.txtLINE_THICKNESS.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            // 
            // txtY_POSITION_PIX
            // 
            this.txtY_POSITION_PIX.BackColor = System.Drawing.Color.White;
            this.txtY_POSITION_PIX.Location = new System.Drawing.Point(112, 150);
            this.txtY_POSITION_PIX.Name = "txtY_POSITION_PIX";
            this.txtY_POSITION_PIX.Size = new System.Drawing.Size(140, 21);
            this.txtY_POSITION_PIX.TabIndex = 10;
            this.txtY_POSITION_PIX.Tag = "Y_POSITION_PIX";
            this.txtY_POSITION_PIX.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtY_POSITION_PIX.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtY_POSITION_PIX_KeyUp);
            // 
            // txtX_POSITION_PIX
            // 
            this.txtX_POSITION_PIX.BackColor = System.Drawing.Color.White;
            this.txtX_POSITION_PIX.Location = new System.Drawing.Point(112, 123);
            this.txtX_POSITION_PIX.Name = "txtX_POSITION_PIX";
            this.txtX_POSITION_PIX.Size = new System.Drawing.Size(140, 21);
            this.txtX_POSITION_PIX.TabIndex = 10;
            this.txtX_POSITION_PIX.Tag = "X_POSITION_PIX";
            this.txtX_POSITION_PIX.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtX_POSITION_PIX.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtX_POSITION_PIX_KeyUp);
            // 
            // txtY_POSITION_MM
            // 
            this.txtY_POSITION_MM.BackColor = System.Drawing.Color.White;
            this.txtY_POSITION_MM.Location = new System.Drawing.Point(112, 96);
            this.txtY_POSITION_MM.Name = "txtY_POSITION_MM";
            this.txtY_POSITION_MM.Size = new System.Drawing.Size(140, 21);
            this.txtY_POSITION_MM.TabIndex = 10;
            this.txtY_POSITION_MM.Tag = "Y_POSITION_MM";
            this.txtY_POSITION_MM.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtY_POSITION_MM.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtY_POSITION_MM_KeyUp);
            // 
            // txtHEIGHT_AREA_PIX
            // 
            this.txtHEIGHT_AREA_PIX.BackColor = System.Drawing.Color.White;
            this.txtHEIGHT_AREA_PIX.Location = new System.Drawing.Point(497, 123);
            this.txtHEIGHT_AREA_PIX.Name = "txtHEIGHT_AREA_PIX";
            this.txtHEIGHT_AREA_PIX.Size = new System.Drawing.Size(102, 21);
            this.txtHEIGHT_AREA_PIX.TabIndex = 10;
            this.txtHEIGHT_AREA_PIX.Tag = "HEIGHT_AREA_PIX";
            this.txtHEIGHT_AREA_PIX.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtHEIGHT_AREA_PIX.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtHEIGHT_AREA_PIX_KeyUp);
            // 
            // txtBARCODE_HEIGHT_PIX
            // 
            this.txtBARCODE_HEIGHT_PIX.BackColor = System.Drawing.Color.White;
            this.txtBARCODE_HEIGHT_PIX.Location = new System.Drawing.Point(824, 150);
            this.txtBARCODE_HEIGHT_PIX.Name = "txtBARCODE_HEIGHT_PIX";
            this.txtBARCODE_HEIGHT_PIX.Size = new System.Drawing.Size(100, 21);
            this.txtBARCODE_HEIGHT_PIX.TabIndex = 10;
            this.txtBARCODE_HEIGHT_PIX.Tag = "BARCODE_HEIGHT_PIX";
            this.txtBARCODE_HEIGHT_PIX.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtBARCODE_HEIGHT_PIX_KeyUp);
            // 
            // txtBARCODE_HEIGHT_MM
            // 
            this.txtBARCODE_HEIGHT_MM.BackColor = System.Drawing.Color.White;
            this.txtBARCODE_HEIGHT_MM.Location = new System.Drawing.Point(824, 123);
            this.txtBARCODE_HEIGHT_MM.Name = "txtBARCODE_HEIGHT_MM";
            this.txtBARCODE_HEIGHT_MM.Size = new System.Drawing.Size(100, 21);
            this.txtBARCODE_HEIGHT_MM.TabIndex = 10;
            this.txtBARCODE_HEIGHT_MM.Tag = "BARCODE_HEIGHT_MM";
            this.txtBARCODE_HEIGHT_MM.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtBARCODE_HEIGHT_MM.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtBARCODE_HEIGHT_MM_KeyUp);
            // 
            // txtWIDTH_AREA_PIX
            // 
            this.txtWIDTH_AREA_PIX.BackColor = System.Drawing.Color.White;
            this.txtWIDTH_AREA_PIX.Location = new System.Drawing.Point(497, 96);
            this.txtWIDTH_AREA_PIX.Name = "txtWIDTH_AREA_PIX";
            this.txtWIDTH_AREA_PIX.Size = new System.Drawing.Size(102, 21);
            this.txtWIDTH_AREA_PIX.TabIndex = 10;
            this.txtWIDTH_AREA_PIX.Tag = "WIDTH_AREA_PIX";
            this.txtWIDTH_AREA_PIX.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtWIDTH_AREA_PIX.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtWIDTH_AREA_PIX_KeyUp);
            // 
            // txtHEIGHT_AREA_MM
            // 
            this.txtHEIGHT_AREA_MM.BackColor = System.Drawing.Color.White;
            this.txtHEIGHT_AREA_MM.Location = new System.Drawing.Point(498, 68);
            this.txtHEIGHT_AREA_MM.Name = "txtHEIGHT_AREA_MM";
            this.txtHEIGHT_AREA_MM.Size = new System.Drawing.Size(102, 21);
            this.txtHEIGHT_AREA_MM.TabIndex = 10;
            this.txtHEIGHT_AREA_MM.Tag = "HEIGHT_AREA_MM";
            this.txtHEIGHT_AREA_MM.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtHEIGHT_AREA_MM.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtHEIGHT_AREA_MM_KeyUp);
            // 
            // txtWIDTH_AREA_MM
            // 
            this.txtWIDTH_AREA_MM.BackColor = System.Drawing.Color.White;
            this.txtWIDTH_AREA_MM.Location = new System.Drawing.Point(497, 42);
            this.txtWIDTH_AREA_MM.Name = "txtWIDTH_AREA_MM";
            this.txtWIDTH_AREA_MM.Size = new System.Drawing.Size(102, 21);
            this.txtWIDTH_AREA_MM.TabIndex = 10;
            this.txtWIDTH_AREA_MM.Tag = "WIDTH_AREA_MM";
            this.txtWIDTH_AREA_MM.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtWIDTH_AREA_MM.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtWIDTH_AREA_MM_KeyUp);
            // 
            // txtX_POSITION_MM
            // 
            this.txtX_POSITION_MM.BackColor = System.Drawing.Color.White;
            this.txtX_POSITION_MM.Location = new System.Drawing.Point(112, 69);
            this.txtX_POSITION_MM.Name = "txtX_POSITION_MM";
            this.txtX_POSITION_MM.Size = new System.Drawing.Size(140, 21);
            this.txtX_POSITION_MM.TabIndex = 10;
            this.txtX_POSITION_MM.Tag = "X_POSITION_MM";
            this.txtX_POSITION_MM.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.textbox_KeyPress);
            this.txtX_POSITION_MM.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtX_POSITION_MM_KeyUp);
            // 
            // grdLabelObject
            // 
            this.grdLabelObject.AllowUserToAddRows = false;
            this.grdLabelObject.AllowUserToResizeRows = false;
            this.grdLabelObject.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdLabelObject.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdLabelObject.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdLabelObject.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(198)))), ((int)(((byte)(247)))));
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdLabelObject.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.grdLabelObject.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdLabelObject.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.METHODID,
            this.PRINTID,
            this.LABELSEQ,
            this.LABELVALUE,
            this.XPOSITIONMM,
            this.YPOSITIONMM,
            this.XPOSITIONPIX,
            this.YPOSITIONPIX,
            this.LINETHICKNESS,
            this.WIDTHAREAMM,
            this.HEIGHTAREAMM,
            this.WIDTHAREAPIX,
            this.HEIGHTAREAPIX,
            this.BARCODEMODULEWIDTH,
            this.BARCODERATIO,
            this.LANDSCAPE,
            this.BARCODEHEIGHTMM,
            this.BARCODEHEIGHTPIX,
            this.BARCODETEXTUNDERYN,
            this.BARCODE2DSIZE,
            this.CREATEBY,
            this.CREATEDATE,
            this.UPDATEBY,
            this.UPDATEDATE});
            this.grdLabelObject.Data = null;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(198)))), ((int)(((byte)(247)))));
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdLabelObject.DefaultCellStyle = dataGridViewCellStyle2;
            this.grdLabelObject.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdLabelObject.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdLabelObject.EnableHeadersVisualStyles = false;
            this.grdLabelObject.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdLabelObject.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdLabelObject.LanguageCategory = null;
            this.grdLabelObject.LanguageCode = null;
            this.grdLabelObject.Location = new System.Drawing.Point(0, 59);
            this.grdLabelObject.Margin = new System.Windows.Forms.Padding(0);
            this.grdLabelObject.Name = "grdLabelObject";
            this.grdLabelObject.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle3.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(198)))), ((int)(((byte)(247)))));
            dataGridViewCellStyle3.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdLabelObject.RowHeadersDefaultCellStyle = dataGridViewCellStyle3;
            this.grdLabelObject.RowHeadersVisible = false;
            this.grdLabelObject.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdLabelObject.RowTemplate.Height = 23;
            this.grdLabelObject.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdLabelObject.Size = new System.Drawing.Size(1071, 224);
            this.grdLabelObject.TabIndex = 11;
            this.grdLabelObject.CellDoubleClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.grdLabelObject_CellDoubleClick);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(132)))), ((int)(((byte)(168)))), ((int)(((byte)(81)))));
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.White;
            this.btnClose.Location = new System.Drawing.Point(0, 628);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(1071, 34);
            this.btnClose.TabIndex = 4;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // METHODID
            // 
            this.METHODID.HeaderText = "METHOD ID";
            this.METHODID.Name = "METHODID";
            this.METHODID.ReadOnly = true;
            this.METHODID.Resizable = System.Windows.Forms.DataGridViewTriState.True;
            this.METHODID.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Programmatic;
            this.METHODID.Width = 150;
            // 
            // PRINTID
            // 
            this.PRINTID.HeaderText = "PRINT ID";
            this.PRINTID.Name = "PRINTID";
            this.PRINTID.ReadOnly = true;
            // 
            // LABELSEQ
            // 
            this.LABELSEQ.HeaderText = "SEQ";
            this.LABELSEQ.Name = "LABELSEQ";
            this.LABELSEQ.ReadOnly = true;
            // 
            // LABELVALUE
            // 
            this.LABELVALUE.HeaderText = "Value(Bind Data)";
            this.LABELVALUE.Name = "LABELVALUE";
            this.LABELVALUE.ReadOnly = true;
            this.LABELVALUE.Width = 300;
            // 
            // XPOSITIONMM
            // 
            this.XPOSITIONMM.HeaderText = "X축 포지션(mm)";
            this.XPOSITIONMM.Name = "XPOSITIONMM";
            this.XPOSITIONMM.ReadOnly = true;
            // 
            // YPOSITIONMM
            // 
            this.YPOSITIONMM.HeaderText = "Y축 포지션(mm)";
            this.YPOSITIONMM.Name = "YPOSITIONMM";
            this.YPOSITIONMM.ReadOnly = true;
            // 
            // XPOSITIONPIX
            // 
            this.XPOSITIONPIX.HeaderText = "X축 포지션(pixel)";
            this.XPOSITIONPIX.Name = "XPOSITIONPIX";
            this.XPOSITIONPIX.ReadOnly = true;
            // 
            // YPOSITIONPIX
            // 
            this.YPOSITIONPIX.HeaderText = "Y축 포지션(pixel)";
            this.YPOSITIONPIX.Name = "YPOSITIONPIX";
            this.YPOSITIONPIX.ReadOnly = true;
            // 
            // LINETHICKNESS
            // 
            this.LINETHICKNESS.HeaderText = "선굵기";
            this.LINETHICKNESS.Name = "LINETHICKNESS";
            this.LINETHICKNESS.ReadOnly = true;
            // 
            // WIDTHAREAMM
            // 
            this.WIDTHAREAMM.HeaderText = "인쇄영역(넓이, mm)";
            this.WIDTHAREAMM.Name = "WIDTHAREAMM";
            this.WIDTHAREAMM.ReadOnly = true;
            // 
            // HEIGHTAREAMM
            // 
            this.HEIGHTAREAMM.HeaderText = "인쇄영역(높이, mm)";
            this.HEIGHTAREAMM.Name = "HEIGHTAREAMM";
            this.HEIGHTAREAMM.ReadOnly = true;
            // 
            // WIDTHAREAPIX
            // 
            this.WIDTHAREAPIX.HeaderText = "인쇄영역(넓이, pixel)";
            this.WIDTHAREAPIX.Name = "WIDTHAREAPIX";
            this.WIDTHAREAPIX.ReadOnly = true;
            // 
            // HEIGHTAREAPIX
            // 
            this.HEIGHTAREAPIX.HeaderText = "인쇄영역(높이, pixel)";
            this.HEIGHTAREAPIX.Name = "HEIGHTAREAPIX";
            this.HEIGHTAREAPIX.ReadOnly = true;
            // 
            // BARCODEMODULEWIDTH
            // 
            this.BARCODEMODULEWIDTH.HeaderText = "모듈 Width";
            this.BARCODEMODULEWIDTH.Name = "BARCODEMODULEWIDTH";
            this.BARCODEMODULEWIDTH.ReadOnly = true;
            // 
            // BARCODERATIO
            // 
            this.BARCODERATIO.HeaderText = "BARCODE_RATIO";
            this.BARCODERATIO.Name = "BARCODERATIO";
            this.BARCODERATIO.ReadOnly = true;
            // 
            // LANDSCAPE
            // 
            this.LANDSCAPE.HeaderText = "문자회전";
            this.LANDSCAPE.Name = "LANDSCAPE";
            this.LANDSCAPE.ReadOnly = true;
            this.LANDSCAPE.Resizable = System.Windows.Forms.DataGridViewTriState.True;
            this.LANDSCAPE.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Programmatic;
            // 
            // BARCODEHEIGHTMM
            // 
            this.BARCODEHEIGHTMM.HeaderText = "바코드 높이(mm)";
            this.BARCODEHEIGHTMM.Name = "BARCODEHEIGHTMM";
            this.BARCODEHEIGHTMM.ReadOnly = true;
            // 
            // BARCODEHEIGHTPIX
            // 
            this.BARCODEHEIGHTPIX.HeaderText = "바코드 높이(pixel)";
            this.BARCODEHEIGHTPIX.Name = "BARCODEHEIGHTPIX";
            this.BARCODEHEIGHTPIX.ReadOnly = true;
            // 
            // BARCODETEXTUNDERYN
            // 
            this.BARCODETEXTUNDERYN.HeaderText = "바코드 TEXT 표시(UNDER)";
            this.BARCODETEXTUNDERYN.Name = "BARCODETEXTUNDERYN";
            this.BARCODETEXTUNDERYN.ReadOnly = true;
            // 
            // BARCODE2DSIZE
            // 
            this.BARCODE2DSIZE.HeaderText = "2D 바코드 크기";
            this.BARCODE2DSIZE.Name = "BARCODE2DSIZE";
            this.BARCODE2DSIZE.ReadOnly = true;
            // 
            // CREATEBY
            // 
            this.CREATEBY.HeaderText = "생성자";
            this.CREATEBY.Name = "CREATEBY";
            this.CREATEBY.ReadOnly = true;
            // 
            // CREATEDATE
            // 
            this.CREATEDATE.HeaderText = "생성일자";
            this.CREATEDATE.Name = "CREATEDATE";
            this.CREATEDATE.ReadOnly = true;
            // 
            // UPDATEBY
            // 
            this.UPDATEBY.HeaderText = "수정자";
            this.UPDATEBY.Name = "UPDATEBY";
            this.UPDATEBY.ReadOnly = true;
            // 
            // UPDATEDATE
            // 
            this.UPDATEDATE.HeaderText = "수정일자";
            this.UPDATEDATE.Name = "UPDATEDATE";
            this.UPDATEDATE.ReadOnly = true;
            // 
            // frmLabelDesign_P01
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1111, 742);
            this.Controls.Add(this.tableMain);
            this.Name = "frmLabelDesign_P01";
            this.ShowIcon = false;
            this.Text = "Label Design Detail";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.panel3.ResumeLayout(false);
            this.panel3.PerformLayout();
            this.tableMain.ResumeLayout(false);
            this.tableSubTop.ResumeLayout(false);
            this.panel4.ResumeLayout(false);
            this.panel4.PerformLayout();
            this.pnlMain.ResumeLayout(false);
            this.pnlMain.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdLabelObject)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TableLayoutPanel tableMain;
        private System.Windows.Forms.TableLayoutPanel tableSubTop;
        private System.Windows.Forms.Panel pnlMain;
        private ExGrid grdLabelObject;
        private Label lblLabelID;
        private Button btnPrint;
        private Button btnAdd;
        private Button btnSearch;
        private ComboBox cmbPrint;
        private ComboBox cmbState;
        private Label Label5;
        private Label Label3;
        private Label Label2;
        private Label Label4;
        private Label Label1;
        private TextBox txtLabelDesc;
        private TextBox txtFile;
        private TextBox txtLabelID;
        private Button btnLabelListSave;
        private Button btnFile;
        private Button btnDupConfirm;
        private ComboBox cmbMethod;
        private Label Label13;
        private Label Label12;
        private Label lblY_POSITION_PIX;
        private Label lblX_POSITION_PIX;
        private Label lblY_POSITION_MM;
        private Label lblX_POSITION_MM;
        private Button btnLabelObjectSave;
        private Button btnLabelObjectDelete;
        private Label Label7;
        private Button btnBARCODE_HEIGHT_PIX;
        private Button btnHEIGHT_AREA_PIX;
        private Button btnY_POSITION_PIX;
        private Button btnWIDTH_AREA_PIX;
        private Button btnX_POSITION_PIX;
        private Label Label19;
        private Label lblBARCODE_HEIGHT_PIX;
        private Label Label18;
        private Label lblBARCODE_HEIGHT_MM;
        private Label lblHEIGHT_AREA_PIX;
        private Label lblStatus;
        private Label Label23;
        private Label lblWIDTH_AREA_PIX;
        private Label Label22;
        private Label lblHEIGHT_AREA_MM;
        private Label Label21;
        private Label lblWIDTH_AREA_MM;
        private Label Label6;
        private TextBox txtLABEL_SEQ;
        private TextBox txtLABEL_VALUE;
        private TextBox txtLINE_THICKNESS;
        private TextBox txtY_POSITION_PIX;
        private TextBox txtX_POSITION_PIX;
        private TextBox txtY_POSITION_MM;
        private TextBox txtHEIGHT_AREA_PIX;
        private TextBox txtBARCODE_HEIGHT_PIX;
        private TextBox txtBARCODE_HEIGHT_MM;
        private TextBox txtWIDTH_AREA_PIX;
        private TextBox txtHEIGHT_AREA_MM;
        private TextBox txtWIDTH_AREA_MM;
        private TextBox txtX_POSITION_MM;
        private Button btnClose;
        private ComboBox cmbLANDSCAPE;
        private ComboBox cmbBARCODE_2D_SIZE;
        private ComboBox cmbBARCODE_TEXT_UNDER_YN;
        private ComboBox cmbBARCODE_RATIO;
        private ComboBox cmbBARCODE_MODULE_WIDTH;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Panel panel4;
        private Button btnMove;
        private Label Label14;
        private Label Label9;
        private ComboBox cmbMoveY;
        private ComboBox cmbMoveX;
        private Button btnY_POSITION_MM;
        private Button btnX_POSITION_MM;
        private Button btnHEIGHT_AREA_MM;
        private Button btnWIDTH_AREA_MM;
        private Button btnBARCODE_HEIGHT_MM;
        private DataGridViewComboBoxColumn METHODID;
        private DataGridViewTextBoxColumn PRINTID;
        private DataGridViewTextBoxColumn LABELSEQ;
        private DataGridViewTextBoxColumn LABELVALUE;
        private DataGridViewTextBoxColumn XPOSITIONMM;
        private DataGridViewTextBoxColumn YPOSITIONMM;
        private DataGridViewTextBoxColumn XPOSITIONPIX;
        private DataGridViewTextBoxColumn YPOSITIONPIX;
        private DataGridViewTextBoxColumn LINETHICKNESS;
        private DataGridViewTextBoxColumn WIDTHAREAMM;
        private DataGridViewTextBoxColumn HEIGHTAREAMM;
        private DataGridViewTextBoxColumn WIDTHAREAPIX;
        private DataGridViewTextBoxColumn HEIGHTAREAPIX;
        private DataGridViewTextBoxColumn BARCODEMODULEWIDTH;
        private DataGridViewTextBoxColumn BARCODERATIO;
        private DataGridViewComboBoxColumn LANDSCAPE;
        private DataGridViewTextBoxColumn BARCODEHEIGHTMM;
        private DataGridViewTextBoxColumn BARCODEHEIGHTPIX;
        private DataGridViewTextBoxColumn BARCODETEXTUNDERYN;
        private DataGridViewTextBoxColumn BARCODE2DSIZE;
        private DataGridViewTextBoxColumn CREATEBY;
        private DataGridViewTextBoxColumn CREATEDATE;
        private DataGridViewTextBoxColumn UPDATEBY;
        private DataGridViewTextBoxColumn UPDATEDATE;
    }
}