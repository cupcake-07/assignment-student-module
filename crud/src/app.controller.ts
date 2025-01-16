import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Render, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  async getHomePage() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Student Management System</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                  <a class="navbar-brand" href="/students">Student Management System</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav">
                          <li class="nav-item">
                              <a class="nav-link" href="/students/list">View Students</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/students/new">Add Student</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>

          <div class="container mt-5">
              <div class="jumbotron">
                  <h1 class="display-4">Student Management System</h1>
                  <p class="lead">Welcome to the Student Management System</p>
                  <hr class="my-4">
                  <p>Manage your students efficiently with our comprehensive management system.</p>
                  <a class="btn btn-primary btn-lg" href="/students/list" role="button">View Students</a>
                  <a class="btn btn-success btn-lg" href="/students/new" role="button">Add New Student</a>
              </div>

              <div class="row mt-5">
                  <div class="col-md-4">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">Student Management</h5>
                              <p class="card-text">Add, edit, and remove students from the system.</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">View Records</h5>
                              <p class="card-text">Access and view student records easily.</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">Quick Access</h5>
                              <p class="card-text">Navigate through the system efficiently.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <footer class="bg-dark text-white mt-5">
              <div class="container py-3">
                  <p class="text-center mb-0">© 2024 Student Management System. All rights reserved.</p>
              </div>
          </footer>

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
      </html>
    `;
  }

  @Get('new')
  @Render('new-student')
  newStudentForm() {
    return {};
  }

  @Get('list')
  @Render('students')
  async getStudentView() {
    const students = await this.appService.getAllStudents();
    return { 
      students,
      title: 'Student List'
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.appService.createStudent(createStudentDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Student created successfully',
      data: student
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllStudents() {
    const students = await this.appService.getAllStudents();
    return {
      status: HttpStatus.OK,
      data: students
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getStudentById(@Param('id') id: number) {
    const student = await this.appService.getStudentById(id);
    return {
      status: HttpStatus.OK,
      data: student
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateStudent(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.appService.updateStudent(id, updateStudentDto);
    return {
      status: HttpStatus.OK,
      message: 'Student updated successfully',
      data: student
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteStudent(@Param('id') id: number) {
    await this.appService.deleteStudent(id);
    return {
      status: HttpStatus.OK,
      message: 'Student deleted successfully'
    };
  }
}