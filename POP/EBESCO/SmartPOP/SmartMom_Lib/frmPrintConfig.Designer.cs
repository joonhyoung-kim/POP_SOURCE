using MetroFramework.Controls;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    partial class frmPrintConfig
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
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.lblMacaddress = new System.Windows.Forms.Label();
            this.btnGT = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.comboGT = new System.Windows.Forms.ComboBox();
            this.comboCT = new System.Windows.Forms.ComboBox();
            this.comboPallet = new System.Windows.Forms.ComboBox();
            this.txtGT = new System.Windows.Forms.TextBox();
            this.txtCT = new System.Windows.Forms.TextBox();
            this.txtPallet = new System.Windows.Forms.TextBox();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnSave = new System.Windows.Forms.Button();
            this.label6 = new System.Windows.Forms.Label();
            this.comboManage = new System.Windows.Forms.ComboBox();
            this.label10 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.comboPush2 = new System.Windows.Forms.ComboBox();
            this.label8 = new System.Windows.Forms.Label();
            this.comboPush1 = new System.Windows.Forms.ComboBox();
            this.label7 = new System.Windows.Forms.Label();
            this.txtSleep = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.comboGanban = new System.Windows.Forms.ComboBox();
            this.txtGanban = new System.Windows.Forms.TextBox();
            this.label12 = new System.Windows.Forms.Label();
            this.comboPrint = new System.Windows.Forms.ComboBox();
            this.btnCT = new System.Windows.Forms.Button();
            this.btnPallet = new System.Windows.Forms.Button();
            this.btnGanban = new System.Windows.Forms.Button();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel1.ColumnCount = 5;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 19.39314F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 39.57784F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 15.97171F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25.03315F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 296F));
            this.tableLayoutPanel1.Controls.Add(this.lblMacaddress, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.btnGT, 4, 1);
            this.tableLayoutPanel1.Controls.Add(this.label1, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.label2, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.label3, 0, 3);
            this.tableLayoutPanel1.Controls.Add(this.comboGT, 1, 1);
            this.tableLayoutPanel1.Controls.Add(this.comboCT, 1, 2);
            this.tableLayoutPanel1.Controls.Add(this.comboPallet, 1, 3);
            this.tableLayoutPanel1.Controls.Add(this.txtGT, 2, 1);
            this.tableLayoutPanel1.Controls.Add(this.txtCT, 2, 2);
            this.tableLayoutPanel1.Controls.Add(this.txtPallet, 2, 3);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 9);
            this.tableLayoutPanel1.Controls.Add(this.label6, 0, 8);
            this.tableLayoutPanel1.Controls.Add(this.comboManage, 1, 8);
            this.tableLayoutPanel1.Controls.Add(this.label10, 2, 7);
            this.tableLayoutPanel1.Controls.Add(this.label9, 2, 6);
            this.tableLayoutPanel1.Controls.Add(this.label5, 2, 5);
            this.tableLayoutPanel1.Controls.Add(this.comboPush2, 1, 7);
            this.tableLayoutPanel1.Controls.Add(this.label8, 0, 7);
            this.tableLayoutPanel1.Controls.Add(this.comboPush1, 1, 6);
            this.tableLayoutPanel1.Controls.Add(this.label7, 0, 6);
            this.tableLayoutPanel1.Controls.Add(this.txtSleep, 1, 5);
            this.tableLayoutPanel1.Controls.Add(this.label4, 0, 5);
            this.tableLayoutPanel1.Controls.Add(this.label11, 0, 4);
            this.tableLayoutPanel1.Controls.Add(this.comboGanban, 1, 4);
            this.tableLayoutPanel1.Controls.Add(this.txtGanban, 2, 4);
            this.tableLayoutPanel1.Controls.Add(this.label12, 2, 8);
            this.tableLayoutPanel1.Controls.Add(this.comboPrint, 3, 8);
            this.tableLayoutPanel1.Controls.Add(this.btnCT, 4, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnPallet, 4, 3);
            this.tableLayoutPanel1.Controls.Add(this.btnGanban, 4, 4);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 10;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 84F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1920, 1080);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // lblMacaddress
            // 
            this.lblMacaddress.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.lblMacaddress, 5);
            this.lblMacaddress.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblMacaddress.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblMacaddress.Location = new System.Drawing.Point(2, 2);
            this.lblMacaddress.Margin = new System.Windows.Forms.Padding(1);
            this.lblMacaddress.Name = "lblMacaddress";
            this.lblMacaddress.Size = new System.Drawing.Size(1916, 82);
            this.lblMacaddress.TabIndex = 0;
            this.lblMacaddress.Text = "Macaddress";
            this.lblMacaddress.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnGT
            // 
            this.btnGT.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnGT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnGT.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGT.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnGT.Location = new System.Drawing.Point(1624, 89);
            this.btnGT.Name = "btnGT";
            this.btnGT.Size = new System.Drawing.Size(292, 78);
            this.btnGT.TabIndex = 8;
            this.btnGT.Text = "TEST";
            this.btnGT.UseVisualStyleBackColor = false;
            this.btnGT.Click += new System.EventHandler(this.btnGT_Click);
            // 
            // label1
            // 
            this.label1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label1.Location = new System.Drawing.Point(2, 87);
            this.label1.Margin = new System.Windows.Forms.Padding(1);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(311, 82);
            this.label1.TabIndex = 1;
            this.label1.Text = "제품포장라벨";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // label2
            // 
            this.label2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label2.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label2.Location = new System.Drawing.Point(2, 172);
            this.label2.Margin = new System.Windows.Forms.Padding(1);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(311, 82);
            this.label2.TabIndex = 1;
            this.label2.Text = "박스포장라벨";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label3
            // 
            this.label3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label3.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label3.Location = new System.Drawing.Point(2, 257);
            this.label3.Margin = new System.Windows.Forms.Padding(1);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(311, 82);
            this.label3.TabIndex = 1;
            this.label3.Text = "팔레트라벨";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // comboGT
            // 
            this.comboGT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboGT.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboGT.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboGT.FormattingEnabled = true;
            this.comboGT.Location = new System.Drawing.Point(316, 87);
            this.comboGT.Margin = new System.Windows.Forms.Padding(1);
            this.comboGT.Name = "comboGT";
            this.comboGT.Size = new System.Drawing.Size(638, 82);
            this.comboGT.TabIndex = 2;
            this.comboGT.SelectedIndexChanged += new System.EventHandler(this.comboGT_SelectedIndexChanged_1);
            // 
            // comboCT
            // 
            this.comboCT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboCT.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboCT.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboCT.FormattingEnabled = true;
            this.comboCT.Location = new System.Drawing.Point(316, 172);
            this.comboCT.Margin = new System.Windows.Forms.Padding(1);
            this.comboCT.Name = "comboCT";
            this.comboCT.Size = new System.Drawing.Size(638, 82);
            this.comboCT.TabIndex = 2;
            // 
            // comboPallet
            // 
            this.comboPallet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboPallet.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPallet.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboPallet.FormattingEnabled = true;
            this.comboPallet.Location = new System.Drawing.Point(316, 257);
            this.comboPallet.Margin = new System.Windows.Forms.Padding(1);
            this.comboPallet.Name = "comboPallet";
            this.comboPallet.Size = new System.Drawing.Size(638, 82);
            this.comboPallet.TabIndex = 2;
            // 
            // txtGT
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.txtGT, 2);
            this.txtGT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtGT.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.txtGT.Location = new System.Drawing.Point(956, 86);
            this.txtGT.Margin = new System.Windows.Forms.Padding(0);
            this.txtGT.Name = "txtGT";
            this.txtGT.ReadOnly = true;
            this.txtGT.Size = new System.Drawing.Size(664, 82);
            this.txtGT.TabIndex = 3;
            this.txtGT.TextChanged += new System.EventHandler(this.txtGT_TextChanged);
            // 
            // txtCT
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.txtCT, 2);
            this.txtCT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtCT.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.txtCT.Location = new System.Drawing.Point(956, 171);
            this.txtCT.Margin = new System.Windows.Forms.Padding(0);
            this.txtCT.Name = "txtCT";
            this.txtCT.ReadOnly = true;
            this.txtCT.Size = new System.Drawing.Size(664, 82);
            this.txtCT.TabIndex = 3;
            // 
            // txtPallet
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.txtPallet, 2);
            this.txtPallet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtPallet.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.txtPallet.Location = new System.Drawing.Point(956, 256);
            this.txtPallet.Margin = new System.Windows.Forms.Padding(0);
            this.txtPallet.Name = "txtPallet";
            this.txtPallet.ReadOnly = true;
            this.txtPallet.Size = new System.Drawing.Size(664, 82);
            this.txtPallet.TabIndex = 3;
            // 
            // panel1
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.panel1, 5);
            this.panel1.Controls.Add(this.btnClose);
            this.panel1.Controls.Add(this.btnSave);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(1, 766);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1918, 313);
            this.panel1.TabIndex = 5;
            // 
            // btnClose
            // 
            this.btnClose.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnClose.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.Location = new System.Drawing.Point(1609, 112);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(298, 134);
            this.btnClose.TabIndex = 8;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnSave
            // 
            this.btnSave.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnSave.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnSave.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSave.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnSave.Location = new System.Drawing.Point(1290, 112);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(298, 134);
            this.btnSave.TabIndex = 8;
            this.btnSave.Text = "저 장";
            this.btnSave.UseVisualStyleBackColor = false;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // label6
            // 
            this.label6.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label6.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label6.Location = new System.Drawing.Point(2, 682);
            this.label6.Margin = new System.Windows.Forms.Padding(1);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(311, 82);
            this.label6.TabIndex = 1;
            this.label6.Text = "관리타입";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.label6.Click += new System.EventHandler(this.label6_Click);
            // 
            // comboManage
            // 
            this.comboManage.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboManage.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboManage.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboManage.FormattingEnabled = true;
            this.comboManage.Location = new System.Drawing.Point(316, 682);
            this.comboManage.Margin = new System.Windows.Forms.Padding(1);
            this.comboManage.Name = "comboManage";
            this.comboManage.Size = new System.Drawing.Size(638, 82);
            this.comboManage.TabIndex = 2;
            this.comboManage.SelectedIndexChanged += new System.EventHandler(this.comboManage_SelectedIndexChanged);
            // 
            // label10
            // 
            this.label10.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.label10, 3);
            this.label10.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label10.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label10.Location = new System.Drawing.Point(957, 597);
            this.label10.Margin = new System.Windows.Forms.Padding(1);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(961, 82);
            this.label10.TabIndex = 1;
            this.label10.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label9
            // 
            this.label9.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.label9, 3);
            this.label9.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label9.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label9.Location = new System.Drawing.Point(957, 512);
            this.label9.Margin = new System.Windows.Forms.Padding(1);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(961, 82);
            this.label9.TabIndex = 1;
            this.label9.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label5
            // 
            this.label5.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.label5, 3);
            this.label5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label5.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label5.Location = new System.Drawing.Point(957, 427);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(961, 82);
            this.label5.TabIndex = 1;
            this.label5.Text = "갯수 대비 WaitTime : 10^2000 → 10개 인쇄된 후 2초 wait";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // comboPush2
            // 
            this.comboPush2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboPush2.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPush2.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboPush2.FormattingEnabled = true;
            this.comboPush2.Location = new System.Drawing.Point(316, 597);
            this.comboPush2.Margin = new System.Windows.Forms.Padding(1);
            this.comboPush2.Name = "comboPush2";
            this.comboPush2.Size = new System.Drawing.Size(638, 82);
            this.comboPush2.TabIndex = 2;
            // 
            // label8
            // 
            this.label8.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label8.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label8.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label8.Location = new System.Drawing.Point(2, 597);
            this.label8.Margin = new System.Windows.Forms.Padding(1);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(311, 82);
            this.label8.TabIndex = 1;
            this.label8.Text = "-";
            this.label8.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // comboPush1
            // 
            this.comboPush1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboPush1.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPush1.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboPush1.FormattingEnabled = true;
            this.comboPush1.Location = new System.Drawing.Point(316, 512);
            this.comboPush1.Margin = new System.Windows.Forms.Padding(1);
            this.comboPush1.Name = "comboPush1";
            this.comboPush1.Size = new System.Drawing.Size(638, 82);
            this.comboPush1.TabIndex = 2;
            // 
            // label7
            // 
            this.label7.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label7.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label7.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label7.Location = new System.Drawing.Point(2, 512);
            this.label7.Margin = new System.Windows.Forms.Padding(1);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(311, 82);
            this.label7.TabIndex = 1;
            this.label7.Text = "저울";
            this.label7.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.label7.Click += new System.EventHandler(this.label7_Click);
            // 
            // txtSleep
            // 
            this.txtSleep.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtSleep.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.txtSleep.Location = new System.Drawing.Point(315, 426);
            this.txtSleep.Margin = new System.Windows.Forms.Padding(0);
            this.txtSleep.Name = "txtSleep";
            this.txtSleep.Size = new System.Drawing.Size(640, 82);
            this.txtSleep.TabIndex = 3;
            this.txtSleep.TextChanged += new System.EventHandler(this.txtSleep_TextChanged);
            // 
            // label4
            // 
            this.label4.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label4.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label4.Location = new System.Drawing.Point(2, 427);
            this.label4.Margin = new System.Windows.Forms.Padding(1);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(311, 82);
            this.label4.TabIndex = 1;
            this.label4.Text = "인쇄속도";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label11
            // 
            this.label11.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label11.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label11.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label11.Location = new System.Drawing.Point(2, 342);
            this.label11.Margin = new System.Windows.Forms.Padding(1);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(311, 82);
            this.label11.TabIndex = 1;
            this.label11.Text = "간판라벨";
            this.label11.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.label11.Click += new System.EventHandler(this.label11_Click);
            // 
            // comboGanban
            // 
            this.comboGanban.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboGanban.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboGanban.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboGanban.FormattingEnabled = true;
            this.comboGanban.Location = new System.Drawing.Point(316, 342);
            this.comboGanban.Margin = new System.Windows.Forms.Padding(1);
            this.comboGanban.Name = "comboGanban";
            this.comboGanban.Size = new System.Drawing.Size(638, 82);
            this.comboGanban.TabIndex = 2;
            this.comboGanban.SelectedIndexChanged += new System.EventHandler(this.comboGanban_SelectedIndexChanged_1);
            // 
            // txtGanban
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.txtGanban, 2);
            this.txtGanban.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtGanban.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.txtGanban.Location = new System.Drawing.Point(956, 341);
            this.txtGanban.Margin = new System.Windows.Forms.Padding(0);
            this.txtGanban.Name = "txtGanban";
            this.txtGanban.ReadOnly = true;
            this.txtGanban.Size = new System.Drawing.Size(664, 82);
            this.txtGanban.TabIndex = 3;
            this.txtGanban.TextChanged += new System.EventHandler(this.txtGanban_TextChanged);
            // 
            // label12
            // 
            this.label12.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label12.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label12.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label12.Location = new System.Drawing.Point(957, 682);
            this.label12.Margin = new System.Windows.Forms.Padding(1);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(256, 82);
            this.label12.TabIndex = 1;
            this.label12.Text = "프린터";
            this.label12.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // comboPrint
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.comboPrint, 2);
            this.comboPrint.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboPrint.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPrint.Font = new System.Drawing.Font("맑은 고딕", 42F, System.Drawing.FontStyle.Bold);
            this.comboPrint.FormattingEnabled = true;
            this.comboPrint.Location = new System.Drawing.Point(1216, 682);
            this.comboPrint.Margin = new System.Windows.Forms.Padding(1);
            this.comboPrint.Name = "comboPrint";
            this.comboPrint.Size = new System.Drawing.Size(702, 82);
            this.comboPrint.TabIndex = 2;
            // 
            // btnCT
            // 
            this.btnCT.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnCT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnCT.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnCT.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnCT.Location = new System.Drawing.Point(1624, 174);
            this.btnCT.Name = "btnCT";
            this.btnCT.Size = new System.Drawing.Size(292, 78);
            this.btnCT.TabIndex = 8;
            this.btnCT.Text = "TEST";
            this.btnCT.UseVisualStyleBackColor = false;
            this.btnCT.Click += new System.EventHandler(this.btnCT_Click);
            // 
            // btnPallet
            // 
            this.btnPallet.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnPallet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPallet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPallet.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPallet.Location = new System.Drawing.Point(1624, 259);
            this.btnPallet.Name = "btnPallet";
            this.btnPallet.Size = new System.Drawing.Size(292, 78);
            this.btnPallet.TabIndex = 8;
            this.btnPallet.Text = "TEST";
            this.btnPallet.UseVisualStyleBackColor = false;
            this.btnPallet.Click += new System.EventHandler(this.btnPallet_Click);
            // 
            // btnGanban
            // 
            this.btnGanban.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnGanban.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnGanban.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGanban.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnGanban.Location = new System.Drawing.Point(1624, 344);
            this.btnGanban.Name = "btnGanban";
            this.btnGanban.Size = new System.Drawing.Size(292, 78);
            this.btnGanban.TabIndex = 8;
            this.btnGanban.Text = "TEST";
            this.btnGanban.UseVisualStyleBackColor = false;
            this.btnGanban.Click += new System.EventHandler(this.btnGanban_Click);
            // 
            // frmPrintConfig
            // 
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None;
            this.ClientSize = new System.Drawing.Size(1920, 1080);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmPrintConfig";
            this.Text = "프린터옵션관리";
            this.tableLayoutPanel1.ResumeLayout(false);
            this.tableLayoutPanel1.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label lblMacaddress;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox comboGT;
        private System.Windows.Forms.ComboBox comboCT;
        private System.Windows.Forms.ComboBox comboPallet;
        private System.Windows.Forms.TextBox txtGT;
        private System.Windows.Forms.TextBox txtCT;
        private System.Windows.Forms.TextBox txtPallet;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txtSleep;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox comboManage;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.ComboBox comboPush1;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.ComboBox comboPush2;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.ComboBox comboGanban;
        private System.Windows.Forms.TextBox txtGanban;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.ComboBox comboPrint;
        private System.Windows.Forms.Button btnGT;
        private System.Windows.Forms.Button btnCT;
        private System.Windows.Forms.Button btnPallet;
        private System.Windows.Forms.Button btnGanban;
    }
}