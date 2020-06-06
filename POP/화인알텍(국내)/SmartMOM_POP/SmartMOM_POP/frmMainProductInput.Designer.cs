namespace SmartMOM_POP
{
    partial class frmMainProductInput
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
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
            this.btnLabelPrint = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnGanbanSet = new System.Windows.Forms.Button();
            this.bntReprint = new System.Windows.Forms.Button();
            this.lblPlanQty = new System.Windows.Forms.Label();
            this.btnInit = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.lblButton1 = new System.Windows.Forms.Label();
            this.btnPOSearch = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.lblSPECIFICATION = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.lblLabelID = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.lblFrom = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.lblTo = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.lblGanbanQty = new System.Windows.Forms.Label();
            this.lblPossibleQty = new System.Windows.Forms.Label();
            this.lblItem = new System.Windows.Forms.Label();
            this.lblItemDesc = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.grdGanban = new SmartMom_Lib.ExGrid();
            this.serialButton1 = new System.IO.Ports.SerialPort(this.components);
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
            this.btnLabelPrint.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnLabelPrint.ForeColor = System.Drawing.Color.Black;
            this.btnLabelPrint.Location = new System.Drawing.Point(268, 3);
            this.btnLabelPrint.Margin = new System.Windows.Forms.Padding(0);
            this.btnLabelPrint.Name = "btnLabelPrint";
            this.btnLabelPrint.Size = new System.Drawing.Size(536, 93);
            this.btnLabelPrint.TabIndex = 2;
            this.btnLabelPrint.Text = "간판 발행 && 재고이동";
            this.btnLabelPrint.UseVisualStyleBackColor = false;
            this.btnLabelPrint.Click += new System.EventHandler(this.btnLabelPrint_Click);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.btnGanbanSet);
            this.panel1.Controls.Add(this.btnLabelPrint);
            this.panel1.Controls.Add(this.bntReprint);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 996);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1920, 104);
            this.panel1.TabIndex = 3;
            // 
            // btnGanbanSet
            // 
            this.btnGanbanSet.BackColor = System.Drawing.Color.Gray;
            this.btnGanbanSet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGanbanSet.Font = new System.Drawing.Font("맑은 고딕", 21.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnGanbanSet.ForeColor = System.Drawing.Color.Black;
            this.btnGanbanSet.Location = new System.Drawing.Point(4, 3);
            this.btnGanbanSet.Margin = new System.Windows.Forms.Padding(0);
            this.btnGanbanSet.Name = "btnGanbanSet";
            this.btnGanbanSet.Size = new System.Drawing.Size(257, 93);
            this.btnGanbanSet.TabIndex = 2;
            this.btnGanbanSet.Text = "간반구성 : 0";
            this.btnGanbanSet.UseVisualStyleBackColor = false;
            this.btnGanbanSet.Click += new System.EventHandler(this.btnGanbanSet_Click);
            // 
            // bntReprint
            // 
            this.bntReprint.BackColor = System.Drawing.Color.Silver;
            this.bntReprint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.bntReprint.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.bntReprint.ForeColor = System.Drawing.Color.Black;
            this.bntReprint.Location = new System.Drawing.Point(814, 3);
            this.bntReprint.Margin = new System.Windows.Forms.Padding(0);
            this.bntReprint.Name = "bntReprint";
            this.bntReprint.Size = new System.Drawing.Size(611, 93);
            this.bntReprint.TabIndex = 2;
            this.bntReprint.Text = "간판 재발행(직전 간판라벨)";
            this.bntReprint.UseVisualStyleBackColor = false;
            this.bntReprint.Click += new System.EventHandler(this.bntReprint_Click);
            // 
            // lblPlanQty
            // 
            this.lblPlanQty.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblPlanQty, 3);
            this.lblPlanQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPlanQty.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblPlanQty.Location = new System.Drawing.Point(987, 191);
            this.lblPlanQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblPlanQty.Name = "lblPlanQty";
            this.lblPlanQty.Size = new System.Drawing.Size(676, 58);
            this.lblPlanQty.TabIndex = 8;
            this.lblPlanQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnInit
            // 
            this.btnInit.BackColor = System.Drawing.Color.Silver;
            this.btnInit.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnInit.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnInit.Font = new System.Drawing.Font("맑은 고딕", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnInit.ForeColor = System.Drawing.Color.Black;
            this.btnInit.Location = new System.Drawing.Point(1665, 190);
            this.btnInit.Margin = new System.Windows.Forms.Padding(0);
            this.btnInit.Name = "btnInit";
            this.tableLayoutPanel2.SetRowSpan(this.btnInit, 2);
            this.btnInit.Size = new System.Drawing.Size(252, 128);
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
            this.btnClose.Location = new System.Drawing.Point(1665, 1);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.tableLayoutPanel2.SetRowSpan(this.btnClose, 4);
            this.btnClose.Size = new System.Drawing.Size(252, 188);
            this.btnClose.TabIndex = 2;
            this.btnClose.Text = "닫기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel2.ColumnCount = 7;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 275F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 60F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 257F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 40F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 196F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 180F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 251F));
            this.tableLayoutPanel2.Controls.Add(this.lblButton1, 5, 2);
            this.tableLayoutPanel2.Controls.Add(this.btnPOSearch, 1, 2);
            this.tableLayoutPanel2.Controls.Add(this.lblPlanQty, 3, 4);
            this.tableLayoutPanel2.Controls.Add(this.label1, 0, 2);
            this.tableLayoutPanel2.Controls.Add(this.label5, 2, 3);
            this.tableLayoutPanel2.Controls.Add(this.label6, 2, 4);
            this.tableLayoutPanel2.Controls.Add(this.lblSPECIFICATION, 3, 2);
            this.tableLayoutPanel2.Controls.Add(this.label3, 2, 2);
            this.tableLayoutPanel2.Controls.Add(this.label2, 0, 3);
            this.tableLayoutPanel2.Controls.Add(this.label11, 0, 4);
            this.tableLayoutPanel2.Controls.Add(this.lblLabelID, 1, 4);
            this.tableLayoutPanel2.Controls.Add(this.label12, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.lblFrom, 1, 0);
            this.tableLayoutPanel2.Controls.Add(this.label14, 2, 0);
            this.tableLayoutPanel2.Controls.Add(this.lblTo, 3, 0);
            this.tableLayoutPanel2.Controls.Add(this.btnClose, 6, 0);
            this.tableLayoutPanel2.Controls.Add(this.btnInit, 6, 4);
            this.tableLayoutPanel2.Controls.Add(this.label9, 0, 5);
            this.tableLayoutPanel2.Controls.Add(this.label10, 2, 5);
            this.tableLayoutPanel2.Controls.Add(this.lblGanbanQty, 1, 5);
            this.tableLayoutPanel2.Controls.Add(this.lblPossibleQty, 3, 5);
            this.tableLayoutPanel2.Controls.Add(this.lblItem, 1, 3);
            this.tableLayoutPanel2.Controls.Add(this.lblItemDesc, 3, 3);
            this.tableLayoutPanel2.Controls.Add(this.panel2, 0, 1);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(1, 1);
            this.tableLayoutPanel2.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 6;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 5F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 65F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(1918, 319);
            this.tableLayoutPanel2.TabIndex = 0;
            // 
            // lblButton1
            // 
            this.lblButton1.BackColor = System.Drawing.Color.Tomato;
            this.lblButton1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblButton1.Font = new System.Drawing.Font("맑은 고딕", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblButton1.Location = new System.Drawing.Point(1485, 69);
            this.lblButton1.Margin = new System.Windows.Forms.Padding(1);
            this.lblButton1.Name = "lblButton1";
            this.lblButton1.Size = new System.Drawing.Size(178, 58);
            this.lblButton1.TabIndex = 12;
            this.lblButton1.Text = "버튼1(멈춤)";
            this.lblButton1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnPOSearch
            // 
            this.btnPOSearch.BackColor = System.Drawing.Color.Silver;
            this.btnPOSearch.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPOSearch.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPOSearch.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPOSearch.ForeColor = System.Drawing.Color.Black;
            this.btnPOSearch.Location = new System.Drawing.Point(277, 68);
            this.btnPOSearch.Margin = new System.Windows.Forms.Padding(0);
            this.btnPOSearch.Name = "btnPOSearch";
            this.btnPOSearch.Size = new System.Drawing.Size(450, 60);
            this.btnPOSearch.TabIndex = 2;
            this.btnPOSearch.Text = "선택";
            this.btnPOSearch.UseVisualStyleBackColor = false;
            this.btnPOSearch.Click += new System.EventHandler(this.btnPOSearch_Click);
            // 
            // label1
            // 
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label1.Location = new System.Drawing.Point(2, 69);
            this.label1.Margin = new System.Windows.Forms.Padding(1);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(273, 58);
            this.label1.TabIndex = 12;
            this.label1.Text = "작업지시번호";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label5
            // 
            this.label5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label5.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label5.Location = new System.Drawing.Point(729, 130);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(255, 58);
            this.label5.TabIndex = 12;
            this.label5.Text = "품명";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label6
            // 
            this.label6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label6.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label6.Location = new System.Drawing.Point(729, 191);
            this.label6.Margin = new System.Windows.Forms.Padding(1);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(255, 58);
            this.label6.TabIndex = 12;
            this.label6.Text = "계획수량(Lot Size)";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblSPECIFICATION
            // 
            this.lblSPECIFICATION.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblSPECIFICATION, 2);
            this.lblSPECIFICATION.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblSPECIFICATION.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblSPECIFICATION.Location = new System.Drawing.Point(987, 69);
            this.lblSPECIFICATION.Margin = new System.Windows.Forms.Padding(1);
            this.lblSPECIFICATION.Name = "lblSPECIFICATION";
            this.lblSPECIFICATION.Size = new System.Drawing.Size(495, 58);
            this.lblSPECIFICATION.TabIndex = 8;
            this.lblSPECIFICATION.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label3
            // 
            this.label3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label3.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label3.Location = new System.Drawing.Point(729, 69);
            this.label3.Margin = new System.Windows.Forms.Padding(1);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(255, 58);
            this.label3.TabIndex = 12;
            this.label3.Text = "규격";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label2
            // 
            this.label2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label2.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label2.Location = new System.Drawing.Point(2, 130);
            this.label2.Margin = new System.Windows.Forms.Padding(1);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(273, 58);
            this.label2.TabIndex = 12;
            this.label2.Text = "품번";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label11
            // 
            this.label11.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label11.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label11.Location = new System.Drawing.Point(2, 191);
            this.label11.Margin = new System.Windows.Forms.Padding(1);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(273, 58);
            this.label11.TabIndex = 12;
            this.label11.Text = "라벨ID";
            this.label11.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblLabelID
            // 
            this.lblLabelID.BackColor = System.Drawing.Color.Gainsboro;
            this.lblLabelID.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblLabelID.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblLabelID.Location = new System.Drawing.Point(278, 191);
            this.lblLabelID.Margin = new System.Windows.Forms.Padding(1);
            this.lblLabelID.Name = "lblLabelID";
            this.lblLabelID.Size = new System.Drawing.Size(448, 58);
            this.lblLabelID.TabIndex = 8;
            this.lblLabelID.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label12
            // 
            this.label12.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label12.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label12.Location = new System.Drawing.Point(2, 2);
            this.label12.Margin = new System.Windows.Forms.Padding(1);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(273, 58);
            this.label12.TabIndex = 12;
            this.label12.Text = "From 창고";
            this.label12.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblFrom
            // 
            this.lblFrom.BackColor = System.Drawing.Color.Gainsboro;
            this.lblFrom.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblFrom.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblFrom.Location = new System.Drawing.Point(278, 2);
            this.lblFrom.Margin = new System.Windows.Forms.Padding(1);
            this.lblFrom.Name = "lblFrom";
            this.lblFrom.Size = new System.Drawing.Size(448, 58);
            this.lblFrom.TabIndex = 8;
            this.lblFrom.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label14
            // 
            this.label14.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label14.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label14.Location = new System.Drawing.Point(729, 2);
            this.label14.Margin = new System.Windows.Forms.Padding(1);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(255, 58);
            this.label14.TabIndex = 12;
            this.label14.Text = "To 창고";
            this.label14.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblTo
            // 
            this.lblTo.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblTo, 3);
            this.lblTo.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTo.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblTo.Location = new System.Drawing.Point(987, 2);
            this.lblTo.Margin = new System.Windows.Forms.Padding(1);
            this.lblTo.Name = "lblTo";
            this.lblTo.Size = new System.Drawing.Size(676, 58);
            this.lblTo.TabIndex = 8;
            this.lblTo.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label9
            // 
            this.label9.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label9.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label9.ForeColor = System.Drawing.Color.DarkRed;
            this.label9.Location = new System.Drawing.Point(2, 252);
            this.label9.Margin = new System.Windows.Forms.Padding(1);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(273, 65);
            this.label9.TabIndex = 12;
            this.label9.Text = "간판구성수량";
            this.label9.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label10
            // 
            this.label10.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label10.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label10.ForeColor = System.Drawing.Color.DarkRed;
            this.label10.Location = new System.Drawing.Point(729, 252);
            this.label10.Margin = new System.Windows.Forms.Padding(1);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(255, 65);
            this.label10.TabIndex = 12;
            this.label10.Text = "간판생성가능수량";
            this.label10.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblGanbanQty
            // 
            this.lblGanbanQty.BackColor = System.Drawing.Color.Gainsboro;
            this.lblGanbanQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblGanbanQty.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblGanbanQty.Location = new System.Drawing.Point(278, 252);
            this.lblGanbanQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblGanbanQty.Name = "lblGanbanQty";
            this.lblGanbanQty.Size = new System.Drawing.Size(448, 65);
            this.lblGanbanQty.TabIndex = 8;
            this.lblGanbanQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblPossibleQty
            // 
            this.lblPossibleQty.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblPossibleQty, 3);
            this.lblPossibleQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPossibleQty.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblPossibleQty.Location = new System.Drawing.Point(987, 252);
            this.lblPossibleQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblPossibleQty.Name = "lblPossibleQty";
            this.lblPossibleQty.Size = new System.Drawing.Size(676, 65);
            this.lblPossibleQty.TabIndex = 8;
            this.lblPossibleQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblItem
            // 
            this.lblItem.BackColor = System.Drawing.Color.Gainsboro;
            this.lblItem.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItem.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblItem.Location = new System.Drawing.Point(278, 130);
            this.lblItem.Margin = new System.Windows.Forms.Padding(1);
            this.lblItem.Name = "lblItem";
            this.lblItem.Size = new System.Drawing.Size(448, 58);
            this.lblItem.TabIndex = 8;
            this.lblItem.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblItemDesc
            // 
            this.lblItemDesc.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblItemDesc, 3);
            this.lblItemDesc.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItemDesc.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblItemDesc.Location = new System.Drawing.Point(987, 130);
            this.lblItemDesc.Margin = new System.Windows.Forms.Padding(1);
            this.lblItemDesc.Name = "lblItemDesc";
            this.lblItemDesc.Size = new System.Drawing.Size(676, 58);
            this.lblItemDesc.TabIndex = 8;
            this.lblItemDesc.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.Maroon;
            this.tableLayoutPanel2.SetColumnSpan(this.panel2, 6);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(6, 62);
            this.panel2.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1653, 5);
            this.panel2.TabIndex = 13;
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
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 321F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 104F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1920, 1100);
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
            this.grdGanban.Location = new System.Drawing.Point(3, 324);
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
            this.grdGanban.Size = new System.Drawing.Size(1914, 669);
            this.grdGanban.TabIndex = 2;
            // 
            // frmMainProductInput
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1920, 1100);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmMainProductInput";
            this.Text = "대차재고이동";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.frmMainProductInput_FormClosed);
            this.panel1.ResumeLayout(false);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tableLayoutPanel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.grdGanban)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnLabelPrint;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        private System.Windows.Forms.Label lblPlanQty;
        private System.Windows.Forms.Button btnInit;
        private System.Windows.Forms.Button btnClose;
        private SmartMom_Lib.ExGrid grdGanban;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label lblGanbanQty;
        private System.Windows.Forms.Button btnGanbanSet;
        private System.Windows.Forms.Button bntReprint;
        private System.Windows.Forms.Label lblPossibleQty;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label lblLabelID;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Label lblFrom;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label lblTo;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnPOSearch;
        private System.Windows.Forms.Label lblSPECIFICATION;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label lblItem;
        private System.Windows.Forms.Label lblItemDesc;
        private System.Windows.Forms.Panel panel2;
        private System.IO.Ports.SerialPort serialButton1;
        private System.Windows.Forms.Label lblButton1;
    }
}