using MetroFramework.Controls;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    partial class frmPrintConfig2
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
            this.comboGT = new System.Windows.Forms.ComboBox();
            this.comboPallet = new System.Windows.Forms.ComboBox();
            this.txtGT = new System.Windows.Forms.TextBox();
            this.txtCT = new System.Windows.Forms.TextBox();
            this.txtPallet = new System.Windows.Forms.TextBox();
            this.comboManage = new System.Windows.Forms.ComboBox();
            this.label10 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.comboPush2 = new System.Windows.Forms.ComboBox();
            this.comboPush1 = new System.Windows.Forms.ComboBox();
            this.comboGanban = new System.Windows.Forms.ComboBox();
            this.txtGanban = new System.Windows.Forms.TextBox();
            this.label12 = new System.Windows.Forms.Label();
            this.comboPrint = new System.Windows.Forms.ComboBox();
            this.btnCT = new System.Windows.Forms.Button();
            this.btnPallet = new System.Windows.Forms.Button();
            this.btnGanban = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnSave = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.comboCT = new System.Windows.Forms.ComboBox();
            this.txtSleep = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.tableLayoutPanel1.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.tableLayoutPanel1.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel1.ColumnCount = 5;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 18.88782F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 47.2675F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 18.69607F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 15.0838F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 201F));
            this.tableLayoutPanel1.Controls.Add(this.label13, 0, 8);
            this.tableLayoutPanel1.Controls.Add(this.label11, 0, 7);
            this.tableLayoutPanel1.Controls.Add(this.label8, 0, 6);
            this.tableLayoutPanel1.Controls.Add(this.label7, 0, 5);
            this.tableLayoutPanel1.Controls.Add(this.label6, 0, 4);
            this.tableLayoutPanel1.Controls.Add(this.label4, 0, 3);
            this.tableLayoutPanel1.Controls.Add(this.label3, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnGT, 4, 1);
            this.tableLayoutPanel1.Controls.Add(this.txtPallet, 2, 3);
            this.tableLayoutPanel1.Controls.Add(this.comboManage, 1, 8);
            this.tableLayoutPanel1.Controls.Add(this.label10, 2, 7);
            this.tableLayoutPanel1.Controls.Add(this.label9, 2, 6);
            this.tableLayoutPanel1.Controls.Add(this.label5, 2, 5);
            this.tableLayoutPanel1.Controls.Add(this.comboPush2, 1, 7);
            this.tableLayoutPanel1.Controls.Add(this.comboPush1, 1, 6);
            this.tableLayoutPanel1.Controls.Add(this.label12, 2, 8);
            this.tableLayoutPanel1.Controls.Add(this.comboPrint, 3, 8);
            this.tableLayoutPanel1.Controls.Add(this.btnCT, 4, 2);
            this.tableLayoutPanel1.Controls.Add(this.btnPallet, 4, 3);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 9);
            this.tableLayoutPanel1.Controls.Add(this.lblMacaddress, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.comboPallet, 1, 3);
            this.tableLayoutPanel1.Controls.Add(this.comboCT, 1, 2);
            this.tableLayoutPanel1.Controls.Add(this.comboGT, 1, 1);
            this.tableLayoutPanel1.Controls.Add(this.txtGT, 2, 1);
            this.tableLayoutPanel1.Controls.Add(this.txtCT, 2, 2);
            this.tableLayoutPanel1.Controls.Add(this.txtGanban, 2, 4);
            this.tableLayoutPanel1.Controls.Add(this.btnGanban, 4, 4);
            this.tableLayoutPanel1.Controls.Add(this.label2, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.txtSleep, 1, 5);
            this.tableLayoutPanel1.Controls.Add(this.comboGanban, 1, 4);
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, -10);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 10;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 59F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 63F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 62F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 61F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 56F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 64F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 63F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 61F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 64F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1248, 800);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // lblMacaddress
            // 
            this.lblMacaddress.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblMacaddress.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.lblMacaddress, 5);
            this.lblMacaddress.Font = new System.Drawing.Font("맑은 고딕", 28F, System.Drawing.FontStyle.Bold);
            this.lblMacaddress.Location = new System.Drawing.Point(2, 2);
            this.lblMacaddress.Margin = new System.Windows.Forms.Padding(1);
            this.lblMacaddress.Name = "lblMacaddress";
            this.lblMacaddress.Size = new System.Drawing.Size(1244, 56);
            this.lblMacaddress.TabIndex = 0;
            this.lblMacaddress.Text = "Macaddress";
            this.lblMacaddress.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblMacaddress.Click += new System.EventHandler(this.lblMacaddress_Click);
            // 
            // btnGT
            // 
            this.btnGT.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.btnGT.AutoSize = true;
            this.btnGT.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnGT.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGT.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.btnGT.Location = new System.Drawing.Point(1047, 64);
            this.btnGT.Name = "btnGT";
            this.btnGT.Size = new System.Drawing.Size(197, 57);
            this.btnGT.TabIndex = 8;
            this.btnGT.Text = "TEST";
            this.btnGT.UseVisualStyleBackColor = false;
            this.btnGT.Click += new System.EventHandler(this.btnGT_Click);
            // 
            // comboGT
            // 
            this.comboGT.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.comboGT.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboGT.DropDownWidth = 200;
            this.comboGT.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboGT.FormattingEnabled = true;
            this.comboGT.IntegralHeight = false;
            this.comboGT.ItemHeight = 54;
            this.comboGT.Location = new System.Drawing.Point(199, 62);
            this.comboGT.Margin = new System.Windows.Forms.Padding(1);
            this.comboGT.Name = "comboGT";
            this.comboGT.Size = new System.Drawing.Size(490, 62);
            this.comboGT.TabIndex = 2;
            this.comboGT.SelectedIndexChanged += new System.EventHandler(this.comboGT_SelectedIndexChanged_1);
            // 
            // comboPallet
            // 
            this.comboPallet.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.comboPallet.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPallet.DropDownWidth = 200;
            this.comboPallet.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboPallet.FormattingEnabled = true;
            this.comboPallet.Location = new System.Drawing.Point(199, 189);
            this.comboPallet.Margin = new System.Windows.Forms.Padding(1);
            this.comboPallet.Name = "comboPallet";
            this.comboPallet.Size = new System.Drawing.Size(490, 62);
            this.comboPallet.TabIndex = 2;
            // 
            // txtGT
            // 
            this.txtGT.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel1.SetColumnSpan(this.txtGT, 2);
            this.txtGT.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.txtGT.Location = new System.Drawing.Point(691, 62);
            this.txtGT.Margin = new System.Windows.Forms.Padding(0);
            this.txtGT.Name = "txtGT";
            this.txtGT.ReadOnly = true;
            this.txtGT.Size = new System.Drawing.Size(352, 61);
            this.txtGT.TabIndex = 3;
            this.txtGT.TextChanged += new System.EventHandler(this.txtGT_TextChanged);
            // 
            // txtCT
            // 
            this.txtCT.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel1.SetColumnSpan(this.txtCT, 2);
            this.txtCT.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.txtCT.Location = new System.Drawing.Point(691, 125);
            this.txtCT.Margin = new System.Windows.Forms.Padding(0);
            this.txtCT.Name = "txtCT";
            this.txtCT.ReadOnly = true;
            this.txtCT.Size = new System.Drawing.Size(352, 61);
            this.txtCT.TabIndex = 3;
            // 
            // txtPallet
            // 
            this.txtPallet.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tableLayoutPanel1.SetColumnSpan(this.txtPallet, 2);
            this.txtPallet.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.txtPallet.Location = new System.Drawing.Point(691, 188);
            this.txtPallet.Margin = new System.Windows.Forms.Padding(0);
            this.txtPallet.Name = "txtPallet";
            this.txtPallet.ReadOnly = true;
            this.txtPallet.Size = new System.Drawing.Size(352, 61);
            this.txtPallet.TabIndex = 3;
            // 
            // comboManage
            // 
            this.comboManage.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.comboManage.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboManage.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboManage.FormattingEnabled = true;
            this.comboManage.Location = new System.Drawing.Point(199, 499);
            this.comboManage.Margin = new System.Windows.Forms.Padding(1);
            this.comboManage.Name = "comboManage";
            this.comboManage.Size = new System.Drawing.Size(490, 62);
            this.comboManage.TabIndex = 2;
            this.comboManage.SelectedIndexChanged += new System.EventHandler(this.comboManage_SelectedIndexChanged);
            // 
            // label10
            // 
            this.label10.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label10.AutoSize = true;
            this.label10.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.label10, 3);
            this.label10.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label10.Location = new System.Drawing.Point(692, 437);
            this.label10.Margin = new System.Windows.Forms.Padding(1);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(554, 59);
            this.label10.TabIndex = 1;
            this.label10.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label9
            // 
            this.label9.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label9.AutoSize = true;
            this.label9.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.label9, 3);
            this.label9.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label9.Location = new System.Drawing.Point(692, 373);
            this.label9.Margin = new System.Windows.Forms.Padding(1);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(554, 61);
            this.label9.TabIndex = 1;
            this.label9.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // label5
            // 
            this.label5.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label5.AutoSize = true;
            this.label5.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tableLayoutPanel1.SetColumnSpan(this.label5, 3);
            this.label5.Font = new System.Drawing.Font("맑은 고딕", 13F, System.Drawing.FontStyle.Bold);
            this.label5.Location = new System.Drawing.Point(692, 308);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(554, 62);
            this.label5.TabIndex = 1;
            this.label5.Text = "갯수 대비 WaitTime : 10^2000 → 10개 인쇄된 후 2초 wait";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // comboPush2
            // 
            this.comboPush2.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.comboPush2.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPush2.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboPush2.FormattingEnabled = true;
            this.comboPush2.Location = new System.Drawing.Point(199, 437);
            this.comboPush2.Margin = new System.Windows.Forms.Padding(1);
            this.comboPush2.Name = "comboPush2";
            this.comboPush2.Size = new System.Drawing.Size(490, 62);
            this.comboPush2.TabIndex = 2;
            // 
            // comboPush1
            // 
            this.comboPush1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboPush1.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPush1.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboPush1.FormattingEnabled = true;
            this.comboPush1.Location = new System.Drawing.Point(199, 373);
            this.comboPush1.Margin = new System.Windows.Forms.Padding(1);
            this.comboPush1.Name = "comboPush1";
            this.comboPush1.Size = new System.Drawing.Size(490, 62);
            this.comboPush1.TabIndex = 2;
            // 
            // comboGanban
            // 
            this.comboGanban.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.comboGanban.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboGanban.DropDownWidth = 200;
            this.comboGanban.Font = new System.Drawing.Font("맑은 고딕", 26F, System.Drawing.FontStyle.Bold);
            this.comboGanban.FormattingEnabled = true;
            this.comboGanban.Location = new System.Drawing.Point(199, 251);
            this.comboGanban.Margin = new System.Windows.Forms.Padding(1);
            this.comboGanban.Name = "comboGanban";
            this.comboGanban.Size = new System.Drawing.Size(490, 55);
            this.comboGanban.TabIndex = 2;
            this.comboGanban.SelectedIndexChanged += new System.EventHandler(this.comboGanban_SelectedIndexChanged_1);
            // 
            // txtGanban
            // 
            this.txtGanban.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tableLayoutPanel1.SetColumnSpan(this.txtGanban, 2);
            this.txtGanban.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.txtGanban.Location = new System.Drawing.Point(691, 250);
            this.txtGanban.Margin = new System.Windows.Forms.Padding(0);
            this.txtGanban.Name = "txtGanban";
            this.txtGanban.ReadOnly = true;
            this.txtGanban.Size = new System.Drawing.Size(352, 61);
            this.txtGanban.TabIndex = 3;
            this.txtGanban.TextChanged += new System.EventHandler(this.txtGanban_TextChanged);
            // 
            // label12
            // 
            this.label12.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label12.AutoSize = true;
            this.label12.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.label12.Font = new System.Drawing.Font("맑은 고딕", 15F, System.Drawing.FontStyle.Bold);
            this.label12.Location = new System.Drawing.Point(692, 499);
            this.label12.Margin = new System.Windows.Forms.Padding(1);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(192, 62);
            this.label12.TabIndex = 1;
            this.label12.Text = "프린터";
            this.label12.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // comboPrint
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.comboPrint, 2);
            this.comboPrint.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboPrint.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboPrint.FormattingEnabled = true;
            this.comboPrint.Location = new System.Drawing.Point(887, 499);
            this.comboPrint.Margin = new System.Windows.Forms.Padding(1);
            this.comboPrint.Name = "comboPrint";
            this.comboPrint.Size = new System.Drawing.Size(358, 62);
            this.comboPrint.TabIndex = 2;
            // 
            // btnCT
            // 
            this.btnCT.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCT.AutoSize = true;
            this.btnCT.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnCT.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnCT.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.btnCT.Location = new System.Drawing.Point(1047, 128);
            this.btnCT.Name = "btnCT";
            this.btnCT.Size = new System.Drawing.Size(197, 56);
            this.btnCT.TabIndex = 8;
            this.btnCT.Text = "TEST";
            this.btnCT.UseVisualStyleBackColor = false;
            this.btnCT.Click += new System.EventHandler(this.btnCT_Click);
            // 
            // btnPallet
            // 
            this.btnPallet.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.btnPallet.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnPallet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPallet.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.btnPallet.Location = new System.Drawing.Point(1047, 191);
            this.btnPallet.Name = "btnPallet";
            this.btnPallet.Size = new System.Drawing.Size(197, 55);
            this.btnPallet.TabIndex = 8;
            this.btnPallet.Text = "TEST";
            this.btnPallet.UseVisualStyleBackColor = false;
            this.btnPallet.Click += new System.EventHandler(this.btnPallet_Click);
            // 
            // btnGanban
            // 
            this.btnGanban.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnGanban.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnGanban.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGanban.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.btnGanban.Location = new System.Drawing.Point(1047, 253);
            this.btnGanban.Name = "btnGanban";
            this.btnGanban.Size = new System.Drawing.Size(197, 50);
            this.btnGanban.TabIndex = 8;
            this.btnGanban.Text = "TEST";
            this.btnGanban.UseVisualStyleBackColor = false;
            this.btnGanban.Click += new System.EventHandler(this.btnGanban_Click);
            // 
            // panel1
            // 
            this.panel1.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.tableLayoutPanel1.SetColumnSpan(this.panel1, 5);
            this.panel1.Controls.Add(this.btnSave);
            this.panel1.Controls.Add(this.btnClose);
            this.panel1.Location = new System.Drawing.Point(1, 563);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1246, 236);
            this.panel1.TabIndex = 5;
            // 
            // btnSave
            // 
            this.btnSave.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.btnSave.AutoSize = true;
            this.btnSave.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnSave.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSave.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold);
            this.btnSave.Location = new System.Drawing.Point(823, 12);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(203, 207);
            this.btnSave.TabIndex = 8;
            this.btnSave.Text = "저 장";
            this.btnSave.UseVisualStyleBackColor = false;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // btnClose
            // 
            this.btnClose.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnClose.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold);
            this.btnClose.Location = new System.Drawing.Point(1032, 12);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(204, 205);
            this.btnClose.TabIndex = 8;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // comboCT
            // 
            this.comboCT.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboCT.DropDownWidth = 200;
            this.comboCT.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.comboCT.FormattingEnabled = true;
            this.comboCT.IntegralHeight = false;
            this.comboCT.Location = new System.Drawing.Point(199, 126);
            this.comboCT.Margin = new System.Windows.Forms.Padding(1);
            this.comboCT.Name = "comboCT";
            this.comboCT.Size = new System.Drawing.Size(490, 62);
            this.comboCT.TabIndex = 2;
            // 
            // txtSleep
            // 
            this.txtSleep.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.txtSleep.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold);
            this.txtSleep.Location = new System.Drawing.Point(201, 310);
            this.txtSleep.Name = "txtSleep";
            this.txtSleep.Size = new System.Drawing.Size(486, 61);
            this.txtSleep.TabIndex = 9;
            // 
            // label2
            // 
            this.label2.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label2.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label2.Location = new System.Drawing.Point(4, 62);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(190, 60);
            this.label2.TabIndex = 10;
            this.label2.Text = "제품포장라벨";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.label2.Click += new System.EventHandler(this.label2_Click);
            // 
            // label3
            // 
            this.label3.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label3.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label3.Location = new System.Drawing.Point(4, 126);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(190, 60);
            this.label3.TabIndex = 11;
            this.label3.Text = "박스포장라벨";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label4
            // 
            this.label4.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label4.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label4.Location = new System.Drawing.Point(4, 188);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(190, 60);
            this.label4.TabIndex = 12;
            this.label4.Text = "팔레트라벨";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label6
            // 
            this.label6.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label6.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label6.Location = new System.Drawing.Point(4, 250);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(190, 56);
            this.label6.TabIndex = 13;
            this.label6.Text = "간판라벨";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label7
            // 
            this.label7.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label7.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label7.Location = new System.Drawing.Point(4, 309);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(190, 60);
            this.label7.TabIndex = 14;
            this.label7.Text = "인쇄속도";
            this.label7.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label8
            // 
            this.label8.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label8.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label8.Location = new System.Drawing.Point(4, 373);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(190, 60);
            this.label8.TabIndex = 15;
            this.label8.Text = "저울";
            this.label8.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label11
            // 
            this.label11.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label11.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label11.Location = new System.Drawing.Point(4, 436);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(190, 60);
            this.label11.TabIndex = 16;
            this.label11.Text = "-";
            this.label11.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label13
            // 
            this.label13.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.label13.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold);
            this.label13.Location = new System.Drawing.Point(4, 500);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(190, 60);
            this.label13.TabIndex = 17;
            this.label13.Text = "관리타입";
            this.label13.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // frmPrintConfig2
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(96F, 96F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Dpi;
            this.ClientSize = new System.Drawing.Size(1280, 800);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmPrintConfig2";
            this.Text = "프린터옵션관리";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableLayoutPanel1.ResumeLayout(false);
            this.tableLayoutPanel1.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label lblMacaddress;
        private System.Windows.Forms.ComboBox comboGT;
        private System.Windows.Forms.ComboBox comboPallet;
        private System.Windows.Forms.TextBox txtGT;
        private System.Windows.Forms.TextBox txtCT;
        private System.Windows.Forms.TextBox txtPallet;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox comboManage;
        private System.Windows.Forms.ComboBox comboPush1;
        private System.Windows.Forms.ComboBox comboPush2;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.ComboBox comboGanban;
        private System.Windows.Forms.TextBox txtGanban;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.ComboBox comboPrint;
        private System.Windows.Forms.Button btnGT;
        private System.Windows.Forms.Button btnCT;
        private System.Windows.Forms.Button btnPallet;
        private System.Windows.Forms.Button btnGanban;
        private Button btnSave;
        private Button btnClose;
        private TextBox txtSleep;
        private Label label2;
        private Label label13;
        private Label label11;
        private Label label8;
        private Label label7;
        private Label label6;
        private Label label4;
        private Label label3;
        private ComboBox comboCT;
    }
}