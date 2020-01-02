import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

class CreatePost {
  @ApiProperty({ description: '帖子标题' })
  title: string;
  @ApiProperty({ description: '帖子内容' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '显示博客列表' })
  index() {
    return '显示博客列表';
  }

  @Post()
  @ApiOperation({ summary: '创建博客' })
  created(@Body() body: CreatePost) {
    return body;
  }

  @Get(':id')
  @ApiOperation({ summary: '博客详情' })
  detail(@Param('id') id: string) {
    return '博客详情';
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑博客' })
  update(@Param('id') id: string, @Body() body: CreatePost) {
    return id;
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除博客' })
  remove(@Param('id') id: string) {
    return id;
  }
}
